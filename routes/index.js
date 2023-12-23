const router = require("express").Router()
const productRoute = require("./product")//import the product routing js page

router.use('/product', productRoute) //any url beginning in /product will be directed to ./productRoutes and then use the request's HTTP method sent

module.exports = router