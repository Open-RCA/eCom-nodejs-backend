const { Order, validateOrder } = require("../models/Order.model");

const OrderController = {
  getall(req, res) {
    Order.find()
      .then((orders) => res.send({ success: true, data: orders }))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  getByid(req, res) {
    Order.findById(req.params.id)
      .then((orders) => res.send({ success: true, data: orders }))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  newOrder(req, res) {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error);

    Order.findOne({ userId: req.userId, paymentId: req.body.paymentId })
      .then((order) => {
        if (order) {
          //update
          Order.findByIdAndUpdate(order._id, { paymentId: req.body.paymentId })
            .then((n_order) => res.send(n_order))
            .catch((err) => console.log(err));
          return;
        }

        //create new
        Order.create({
          userId: req.userId,
          paymentId: req.body.paymentId,
        })
          .then((neworder) => res.send(neworder))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  deleteOrder(req, res) {
    Order.findByIdAndDelete(req.params.id)
      .then((ord) => res.send({success: true , message:"Order Deleted"}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
};

module.exports = OrderController;
