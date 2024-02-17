const express = require('express');
const app = express();
const cors = require('cors');
const cookieParse = require('cookie-parser');
const AbsenceRouter = require('./routes/absence.route');
const path = require('path');
require('dotenv').config();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors())

var dir = path.join(__dirname, 'public');
app.use('/public', express.static(dir));

// Routing
app.use('/api/v1/absence', AbsenceRouter)

app.listen(process.env.APP_PORT, () => {
    console.log(`server running in port ${process.env.APP_PORT}`)
})