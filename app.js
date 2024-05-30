const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes'); // Import protected routes

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); // Gunakan protected routes

module.exports = app;
