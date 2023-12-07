import Vote from "../models/vote.js";

// Mendapatkan semua data vote
export const getAllVotes = async (req, res) => {
    try {
        const votes = await Vote.findAll();
        res.json(votes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Menambahkan vote baru
export const addVote = async (req, res) => {
    const { id_buku, jumlah_vote, data_mahasiswa } = req.body;

    try {
        const newVote = await Vote.create({
            id_buku,
            jumlah_vote,
            data_mahasiswa
        });

        res.json(newVote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Mendapatkan data vote berdasarkan ID
export const getVoteById = async (req, res) => {
    const voteId = req.params.id;

    try {
        const vote = await Vote.findByPk(voteId);
        if (!vote) {
            return res.status(404).json({ msg: "Vote tidak ditemukan" });
        }

        res.json(vote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Menghapus data vote berdasarkan ID
export const deleteVoteById = async (req, res) => {
    const voteId = req.params.id;

    try {
        const deletedVote = await Vote.destroy({
            where: {
                id: voteId
            }
        });

        if (!deletedVote) {
            return res.status(404).json({ msg: "Vote tidak ditemukan" });
        }

        res.json({ msg: "Vote berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Memperbarui informasi data vote berdasarkan ID
export const updateVoteById = async (req, res) => {
    const voteId = req.params.id;
    const { id_buku, jumlah_vote, data_mahasiswa } = req.body;

    try {
        const updatedVote = await Vote.update(
            {
                id_buku,
                jumlah_vote,
                data_mahasiswa
            },
            {
                where: {
                    id: voteId
                }
            }
        );

        if (updatedVote[0] === 0) {
            return res.status(404).json({ msg: "Vote tidak ditemukan" });
        }

        res.json({ msg: "Vote berhasil diperbarui" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
