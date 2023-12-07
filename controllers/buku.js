import Buku from "../models/buku.js";

// Mendapatkan semua buku
export const getAllBooks = async (req, res) => {
    try {
        const books = await Buku.findAll();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Menambahkan buku baru
export const addBuku = async (req, res) => {
    const { nama_buku, author, category, deskripsi, img_cover, warna_cover, status_buku } = req.body;

    try {
        const newBook = await Buku.create({
            nama_buku,
            author,
            category,
            deskripsi,
            img_cover,
            warna_cover,
            status_buku
        });

        res.json({ msg: "Buku berhasil ditambahkan" });    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Mendapatkan buku berdasarkan ID
export const getBookById = async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Buku.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ msg: "Buku tidak ditemukan" });
        }

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Menghapus buku berdasarkan ID
export const deleteBookById = async (req, res) => {
    const bookId = req.params.id;

    try {
        const deletedBook = await Buku.destroy({
            where: {
                id: bookId
            }
        });

        if (!deletedBook) {
            return res.status(404).json({ msg: "Buku tidak ditemukan" });
        }

        res.json({ msg: "Buku berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Memperbarui informasi buku berdasarkan ID
export const updateBookById = async (req, res) => {
    const bookId = req.params.id;
    const { nama_buku, author, category, deskripsi, img_cover, warna_cover, status_buku } = req.body;

    try {
        const updatedBook = await Buku.update(
            {
                nama_buku,
                author,
                category,
                deskripsi,
                img_cover,
                warna_cover,
                status_buku
            },
            {
                where: {
                    id: bookId
                }
            }
        );

        if (updatedBook[0] === 0) {
            return res.status(404).json({ msg: "Buku tidak ditemukan" });
        }

        res.json({ msg: "Buku berhasil diperbarui" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
