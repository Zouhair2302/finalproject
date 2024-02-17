const express = require("express");
const mongoose = require("mongoose");


const app = express();
require('dotenv').config()
app.use(express.json());
const userRoutes = require('./routes/userRoutes');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to database');
});

app.use('/apiusers',userRoutes);

app.listen(3000, () => {
  console.log('Server is running... on port 3000');
});
