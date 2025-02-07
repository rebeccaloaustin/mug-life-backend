// Import necessary modules and files
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products.js');
const productCtrl = require('./controllers/productController');
const Product = require('./models/product.js');
const Order = require('./models/order.js')
const orderRoutes = require('./routes/orderRoutes.js')
const initializeDatabase = require("./initializeDatabase")
// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
      initializeDatabase(); // Call the initialization function
      startServer();
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });

    function startServer() {
        // Use product and order routes
        app.use('/products', productRoutes);
        app.use('/orders', orderRoutes);
      
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      }
