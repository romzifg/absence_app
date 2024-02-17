'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Absence extends Model {
        static associate(models) {
            Absence.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        }
    }
    Absence.init({
        absence_id: {
            type: DataTypes.INTEGER,
            defaultValue: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        absence_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        absence_time: {
            type: DataTypes.TIME,
        },
    }, {
        sequelize,
        modelName: 'Absence',
        tableName: 'absences',
    });
    return Absence;
};