const Order = require("../models/Order.model");

const OrderController = {
  getall(req, res) {
    Order.find()
      .then((orders) => res.send({success: true, data: orders}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  getByid(req, res) {
    Order.findById(req.params.id)
      .then((orders) => res.send({success: true, data:orders}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  newOrder(req, res) {
    Order.create({
      userId: req.body.userId,
      paymentId: req.body.paymentId,
    })
      .then((order) => res.send({success: true, data:order}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  deleteOrder(req, res) {
    Order.findByIdAndDelete(req.params.id)
      .then((ord) => res.send({success: true , message:"Order Deleted"}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
};

module.exports = OrderController;
