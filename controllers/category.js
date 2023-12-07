import Category from "../models/category.js";

// Mendapatkan semua kategori buku
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Menambahkan kategori baru
export const addCategory = async (req, res) => {
    const { nama_category } = req.body;

    try {
        const newCategory = await Category.create({
            nama_category
        });

        res.json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Mendapatkan kategori berdasarkan ID
export const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ msg: "Kategori tidak ditemukan" });
        }

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Menghapus kategori berdasarkan ID
export const deleteCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const deletedCategory = await Category.destroy({
            where: {
                id_category: categoryId
            }
        });

        if (!deletedCategory) {
            return res.status(404).json({ msg: "Kategori tidak ditemukan" });
        }

        res.json({ msg: "Kategori berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Memperbarui informasi kategori berdasarkan ID
export const updateCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    const { nama_category } = req.body;

    try {
        const updatedCategory = await Category.update(
            {
                nama_category
            },
            {
                where: {
                    id_category: categoryId
                }
            }
        );

        if (updatedCategory[0] === 0) {
            return res.status(404).json({ msg: "Kategori tidak ditemukan" });
        }

        res.json({ msg: "Kategori berhasil diperbarui" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
