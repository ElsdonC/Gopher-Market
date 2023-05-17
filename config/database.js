require('dotenv').config()
const mongoose = require('mongoose')

const MONGOSTRING = process.env.MONGOSTRING
mongoose.connect(MONGOSTRING);
module.exports = mongoose.connection;