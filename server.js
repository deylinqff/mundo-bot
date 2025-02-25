const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const botRoutes = require('./src/routes/botRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

app.use('/auth', authRoutes);
app.use('/bots', botRoutes);
app.use('/payment', paymentRoutes);

// Set views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Start server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});