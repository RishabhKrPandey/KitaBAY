const express = require('express')
require('dotenv').config();



const app = express()

// connecting the database
const connectDB = require('./config/db')
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
