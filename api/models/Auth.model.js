'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    class Auth extends Model {
        static associate(models) {
            Auth.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        }
    }
    Auth.init({
        auth_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        hooks: {
            beforeCreate: async (auth) => {
                if (auth.password) {
                    const salt = await bcrypt.genSaltSync(10)
                    auth.password = bcrypt.hashSync(auth.password, salt)
                }
            }
        },
        sequelize,
        modelName: 'Auth',
        tableName: 'auths',
    });
    Auth.prototype.CorrectPassword = async (reqPassword, passwordDB) => {
        return await bcrypt.compareSync(reqPassword, passwordDB)
    }
    return Auth;
};