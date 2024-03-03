const express = require('express');
const app = express();
const cors = require('cors');
const cookieParse = require('cookie-parser');
const path = require('path');
const apiv1 = require('./routes/v1/index')
const { errorHandler, notFound } = require('./utils/errorHandler');
require('dotenv').config();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors())

var dir = path.join(__dirname, 'public');
app.use('/public', express.static(dir));

// Routing
// Api V1
app.use('/api/v1', apiv1)

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server Running in PORT ${process.env.APP_PORT}`)
})