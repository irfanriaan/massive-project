import Users from "../models/UserModels.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user[0]) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);

            const userId = user[0].id;
            const npm = user[0].npm;
            const nama = user[0].nama;
            const universitas = user[0].universitas;
            const jurusan = user[0].jurusan;

            // Memperbaiki penulisan expiresIn dan menambahkan tanda kurung pada jwt.sign
            const accessToken = jwt.sign({ userId, npm, nama, universitas, jurusan }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '50s'
            });

            res.json({ accessToken });
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
