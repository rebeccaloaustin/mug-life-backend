require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const initializeDatabase = require("./initializeDatabase")
const bodyParser = require('body-parser');

const routes = require('./routes/index.js')
const users = require('./routes/user.js')
const productRoutes = require('./routes/products.js');
const orderRoutes = require('./routes/orderRoutes.js')


const methodOverride = require('method-override');
// Create an Express application
var cors = require('cors')
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
// app.use(bodyParser.json());
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
        app.use('/routes/user', users)
        app.use('/', routes)
        app.use('/products', productRoutes);
        app.use('/orders', orderRoutes);
        
        // app.use('/register', userRoutes)
      
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      }