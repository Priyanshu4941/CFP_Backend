// const express = require('express');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
// const campaignRoutes = require('./routes/campaignRoutes');
// const dashboardRoutes = require('./routes/dashboard'); // Import dashboard routes
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');  // To handle paths for static assets and views

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json()); // To parse JSON bodies
// app.use(cors()); // Enable Cross-Origin requests

// // Set EJS as the template engine
// app.set('view engine', 'ejs');

// // Serve static files (CSS, JS, Images)
// app.use(express.static(path.join(__dirname, 'public')));

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true, 
//     serverSelectionTimeoutMS: 5000,  
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Routes for your frontend pages (EJS)
// app.get('/', (req, res) => {
//     res.render('pages/index');  // Render the homepage (index.ejs)
// });

// app.get('/register', (req, res) => {
//     res.render('pages/register');  // Render the register page (register.ejs)
// });

// app.get('/login', (req, res) => {
//     res.render('pages/login');  // Render the login page (login.ejs)
// });

// // API routes
// app.use('/auth', authRoutes);
// app.use('/campaigns', campaignRoutes);  // Add campaign routes
// app.use('/dashboard', dashboardRoutes);  // Add dashboard routes

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });












// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const dashboardRoutes = require('./routes/dashboard'); // Import dashboard routes
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');  // To handle paths for static assets and views

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable Cross-Origin requests

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    // Additional logging
    console.log('Trying to connect with URI:', process.env.MONGO_URI);
});

// Routes for your frontend pages (EJS)
app.get('/', (req, res) => {
    res.render('pages/index');  // Render the homepage (index.ejs)
});

app.get('/register', (req, res) => {
    res.render('pages/register');  // Render the register page (register.ejs)
});

app.get('/login', (req, res) => {
    res.render('pages/login');  // Render the login page (login.ejs)
});

// API routes
app.use('/auth', authRoutes);
app.use('/campaigns', campaignRoutes);  // Add campaign routes
app.use('/dashboard', dashboardRoutes);  // Add dashboard routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
