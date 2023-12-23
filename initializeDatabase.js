
const Product = require('./models/product');

async function initializeDatabase() {
  try {
    const existingProducts = await Product.find();

    // If there are no existing products, insert the data
    if (existingProducts.length === 0) {
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

      const insertedProducts = await Product.insertMany(productsData);
      console.log('Products added:', insertedProducts);
    } else {
      console.log('Products already exist in the database. Skipping initialization.');
    }
  } catch (error) {
    console.error('Error initializing products:', error);
  }
}

module.exports = initializeDatabase;
