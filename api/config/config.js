require('dotenv').config()
module.exports = {
    development: {
        username: process.env.APP_DB_USERNAME,
        password: process.env.APP_DB_PASSWORD,
        database: process.env.APP_DB_DATABASE,
        host: process.env.APP_DB_HOST,
        port: process.env.APP_DB_PORT,
        dialect: process.env.APP_DB_CONNECTION
    },
    test: {
        username: process.env.APP_DB_USERNAME,
        password: process.env.APP_DB_PASSWORD,
        database: process.env.APP_DB_DATABASE,
        host: process.env.APP_DB_HOST,
        port: process.env.APP_DB_PORT,
        dialect: process.env.APP_DB_CONNECTION
    },
    production: {
        username: process.env.APP_DB_USERNAME,
        password: process.env.APP_DB_PASSWORD,
        database: process.env.APP_DB_DATABASE,
        host: process.env.APP_DB_HOST,
        port: process.env.APP_DB_PORT,
        dialect: process.env.APP_DB_CONNECTION
    }
}