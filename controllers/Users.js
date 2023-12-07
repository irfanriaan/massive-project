import Users from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'npm', 'nama', 'email', 'universitas', 'jurusan']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const Register = async (req, res) => {
    const { npm, nama, email, universitas, jurusan, password, confpassword } = req.body;

    // Validasi password dan confirm password
    if (password !== confpassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    // Hash password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
        // Simpan data ke database
        await Users.create({
            npm: npm,
            nama: nama,
            email: email,
            universitas: universitas,
            jurusan: jurusan,
            password: hashPassword  // Simpan hash password
        });

        res.json({ msg: "Registrasi berhasil" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });

        // Pastikan user dengan email yang diberikan ditemukan
        if (user.length === 0) {
            return res.status(404).json({ msg: "Email tidak ditemukan" });
        }

        const match = await bcrypt.compare(req.body.password, user[0].password);

        // Pastikan password sesuai
        if (!match) {
            return res.status(400).json({ msg: "Password salah" });
        }

        const userId = user[0].id;
        const npm = user[0].npm;
        const nama = user[0].nama;
        const email = user[0].email;
        const universitas = user[0].universitas;
        const jurusan = user[0].jurusan;

        // Generate access token
        const accessToken = jwt.sign({ userId, nama, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '50s'
        });

        // Generate refresh token
        const refreshToken = jwt.sign({ userId, nama, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        // Update refresh_token di database
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });

        // Set cookie dengan refreshToken
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // Kirim response dengan accessToken
        res.json({ accessToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        // Pastikan refreshToken ada
        if (!refreshToken) {
            return res.sendStatus(204);
        }

        // Cari pengguna berdasarkan refreshToken
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });

        // Pastikan pengguna ditemukan
        if (!user) {
            return res.sendStatus(204);
        }

        // Perbarui refresh_token menjadi null
        await Users.update({ refresh_token: null }, {
            where: {
                id: user.id
            }
        });

        // Hapus cookie refreshToken dari respons
        res.clearCookie('refreshToken');

        // Kirim respons berhasil
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};