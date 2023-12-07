import Universitas from '../models/universitas.js';

export const addUniversity = async (req, res) => {
  try {
    const { kode_universitas, nama_universitas, daftar_jurusan } = req.body;

    // Konversi array menjadi string JSON
    const daftarJurusanString = JSON.stringify(daftar_jurusan);

    const universitas = await Universitas.create({
      kode_universitas,
      nama_universitas,
      daftar_jurusan: daftarJurusanString, // Simpan sebagai string JSON
    });

    // Konversi kembali saat memberikan response jika perlu
    universitas.daftar_jurusan = JSON.parse(universitas.daftar_jurusan);

    res.status(201).json(universitas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
