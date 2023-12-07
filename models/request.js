import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Request = db.define('request', {
    id_request: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_mahasiswa: {
        type: DataTypes.STRING, // Sesuaikan dengan tipe data ID mahasiswa
        allowNull: false,
    },
    data_buku: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    tgl_request: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
}, {
    freezeTableName: true
});

export default Request;
