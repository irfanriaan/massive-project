import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Universitas = db.define('universitas', {
    kode_universitas: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nama_universitas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Menggunakan tipe data TEXT untuk menyimpan daftar jurusan sebagai string
    daftar_jurusan: {
        type: DataTypes.TEXT,
        allowNull: true // Sesuaikan sesuai kebutuhan
    }
}, {
    freezeTableName: true
});

export default Universitas;
