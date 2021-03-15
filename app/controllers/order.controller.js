const { Order, validateOrder } = require("../models/Order.model");
const { OrderDetails } = require("../models/OrderDetails");
const { Product } = require("../models/productModel");
const DetailsController = require("./orderdetails.controller");

const setProductsPrice = async (products, orderId) => {
  for (let i = 0; i < products.length; i++) {
    await Product.findById(products[i].productId)
      .then(async (product) => {
        products[i].price = product.price;
        products[i].total = product.price * products[i].quantity;
        products[i].orderId = orderId;
      })
      .catch((err) => console.log(err));
  }
  return products;
};

const OrderController = {
  getall(req, res) {
    Order.find()
      .then((orders) => res.send({ success: true, data: orders }))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  getByid(req, res) {
    Order.findById(req.params.id)
      .then((order) => {
        let orderData = {};
        orderData.order = order;
        OrderDetails.find({ orderId: order._id })
          .then((details) => {
            orderData.details = details;
            res.send({ success: true, data: orderData });
          })
          .catch((err) => res.send({ success: false, message: err.message }));
      })
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  async newOrder(req, res) {
    let orderId = "";
    const order = {
      customer: String(req.body.customer),
      paymentId: req.body.paymentId,
      delivery_zone: req.body.delivery_zone,
    };

    const { error } = validateOrder(order);
    if (error) return res.status(400).send(error);

    //validate products
    const { products } = req.body;
    if (!products || (Array.isArray(products) && products.length === 0)) {
      res.send({ success: false, message: "Cannot make an empty order!" });
      return;
    }

    //create order
    await Order.findOne({
      customer: req.customer,
      paymentId: req.body.paymentId,
    })
      .then(async (order) => {
        if (order) {
          //update
          await Order.findByIdAndUpdate(
            order._id,
            { $set: order },
            { new: true }
          )
            .then((n_order) => (orderId = String(n_order._id)))
            .catch((err) => console.log(err));
        } else {
          //create new
          await Order.create({
            customer: String(req.body.customer),
            paymentId: req.body.paymentId,
            delivery_zone: req.body.delivery_zone,
          })
            .then(async (neworder) => (orderId = String(neworder._id)))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));

    //add details to products
    setProductsPrice(products, orderId)
      .then((data) => {
        req.products = [...data];
        DetailsController.addProducts(req, res);
      })
      .catch((err) => console.log(err));
  },
  deleteOrder(req, res) {
    //delete order and related details
    Order.findByIdAndDelete(req.params.id)
      .then((ord) => {
        OrderDetails.deleteMany({ orderId: ord._id })
          .then((details) =>
            res.send({ success: true, message: "Order deleted." })
          )
          .catch((err) => res.send({ success: false, message: err.message }));
      })
      .catch((err) => res.send({ success: false, message: err.message }));
  },
};

module.exports = OrderController;
