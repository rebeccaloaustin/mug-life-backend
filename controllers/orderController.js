const Order = require('../models/order.js');

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, customerName, customerEmail, shippingAddress } = req.body;

    // Create a new order
    const order = new Order({
      products,
      totalPrice,
      customerName,
      customerEmail,
      shippingAddress
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get an order by ID
const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error getting order by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update an existing order
const updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const updateData = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete an order
const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
  // Add more controller functions as needed
};
