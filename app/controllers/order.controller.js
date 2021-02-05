const Order = require("../models/Order.model");

const OrderController = {
  getall(req, res) {
    Order.find()
      .then((orders) => res.send(orders))
      .catch((err) => console.log(err));
  },
  getByid(req, res) {
    Order.findById(req.params.id)
      .then((orders) => res.send(orders))
      .catch((err) => console.log(err));
  },
  newOrder(req, res) {
    Order.create({
      userId: req.body.userId,
      paymentId: req.body.paymentId,
    })
      .then((order) => res.send(order))
      .catch((err) => console.log(err));
  },
  deleteOrder(req, res) {
    Order.findByIdAndDelete(req.params.id)
      .then((ord) => res.send("Deleted"))
      .catch((err) => console.log(err));
  },
};

module.exports = OrderController;
