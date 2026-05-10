const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

app.set('view engine', 'ejs'); // Вказуємо, що використовуємо EJS
app.set('views', path.join(__dirname, '../views')); // Кажемо, де лежать шаблони
app.use(express.static(path.join(__dirname, '../public')));

// JSON + CORS (для React)
app.use(express.json());
app.use(cors());

// FORM DATA (як було)
app.use(express.urlencoded({ extended: true }));

// DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ROUTES (API тільки)
const itemRoutes = require('./routes/itemRoutes');
app.use('/', itemRoutes);

module.exports = app;