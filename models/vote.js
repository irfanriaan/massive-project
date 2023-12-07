import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Vote = db.define('vote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_buku: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jumlah_vote: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    data_mahasiswa: {
        type: DataTypes.JSON,
        allowNull: true,
    },
}, {
    freezeTableName: true
});

export default Vote;
