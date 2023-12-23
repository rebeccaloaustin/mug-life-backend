// Import necessary modules and files
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products.js');
const productCtrl = require('./controllers/productController');
const Product = require('./models/product.js')
// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB (replace the connection string)
mongoose.connect('mongodb+srv://shactrix:Hunt3rHunt3r@muglife.oqgtw7i.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const productsData = [
    {
      "name": "blonde roast",
      "price": 12,
      "stock": 56,
      "description": "Blonde-roasted coffee beans have a shorter roast time, allowing for an easy-drinking cup of more mellow flavors.",
      "image": "https://circlehousecoffee.com/wp-content/uploads/2023/06/mahaba-light-roast-coffee-bean-circle-house-coffee-fort-lauderdale-img2.jpg"
    },
    {
      "name": "medium roast",
      "price": 12,
      "stock": 56,
      "description": "Medium-roasted coffee beans are smooth and balanced, with rich, approachable flavors.",
      "image": "https://circlehousecoffee.com/wp-content/uploads/2023/06/mahaba-light-roast-coffee-bean-circle-house-coffee-fort-lauderdale-img2.jpg"
    },
    {
      "name": "dark roast",
      "price": 12,
      "stock": 56,
      "description": "Dark-roasted coffees have a fuller body with robust, bold taste.",
      "image": "https://circlehousecoffee.com/wp-content/uploads/2023/06/mahaba-light-roast-coffee-bean-circle-house-coffee-fort-lauderdale-img2.jpg"
    }
  ];

  async function insertProducts() {
    try {
      const insertedProducts = await Product.insertMany(productsData);
      console.log('Products added:', insertedProducts);
    } catch (error) {
      console.error('Error adding products:', error);
    }
  }

// Use product routes
app.use('/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


