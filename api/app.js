const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
app.use(express.json());
// app.use(cookieParser());
// const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
connectDB();
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});