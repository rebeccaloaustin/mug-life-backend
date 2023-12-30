const router = require("express").Router()
const productRoute = require("./products")//import the product routing js page

router.use('/products', productRoute) //any url beginning in /product will be directed to ./productRoutes and then use the request's HTTP method sent

module.exports = router;
