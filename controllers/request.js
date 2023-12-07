import Request from "../models/request.js";

// Mendapatkan semua data request
export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.findAll();
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Menambahkan request baru
export const addRequest = async (req, res) => {
    const { id_mahasiswa, data_buku, tgl_request } = req.body;

    try {
        const newRequest = await Request.create({
            id_mahasiswa,
            data_buku,
            tgl_request
        });

        res.json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Mendapatkan data request berdasarkan ID
export const getRequestById = async (req, res) => {
    const requestId = req.params.id;

    try {
        const request = await Request.findByPk(requestId);
        if (!request) {
            return res.status(404).json({ msg: "Request tidak ditemukan" });
        }

        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Menghapus data request berdasarkan ID
export const deleteRequestById = async (req, res) => {
    const requestId = req.params.id;

    try {
        const deletedRequest = await Request.destroy({
            where: {
                id_request: requestId
            }
        });

        if (!deletedRequest) {
            return res.status(404).json({ msg: "Request tidak ditemukan" });
        }

        res.json({ msg: "Request berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Memperbarui informasi data request berdasarkan ID
export const updateRequestById = async (req, res) => {
    const requestId = req.params.id;
    const { id_mahasiswa, data_buku, tgl_request } = req.body;

    try {
        const updatedRequest = await Request.update(
            {
                id_mahasiswa,
                data_buku,
                tgl_request
            },
            {
                where: {
                    id_request: requestId
                }
            }
        );

        if (updatedRequest[0] === 0) {
            return res.status(404).json({ msg: "Request tidak ditemukan" });
        }

        res.json({ msg: "Request berhasil diperbarui" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
