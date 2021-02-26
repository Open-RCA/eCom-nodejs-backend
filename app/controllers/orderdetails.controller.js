const OrderDetails = require("../models/OrderDetails");

const DetailsController = {
  getall(req, res) {
    OrderDetails.find()
      .then((details) => res.send({success: true, data:details}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  getByid(req, res) {
    OrderDetails.findById(req.params.id)
      .then((details) => res.send({success: true, data:details}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  addDetails(req, res) {
    OrderDetails.create({
      orderId: req.body.orderId,
      productId: req.body.productId,
      price: req.body.price,
      quantity: req.body.quantity,
      total: req.body.total,
    })
      .then((details) => res.send({success: true, data:details}))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  deleteDetails(req, res) {
    OrderDetails.findByIdAndDelete(req.params.id)
      .then((details) => res.send({ success: true, message: "Order Details deleted successfully" }))
      .catch((err) => res.send({success: false, message: err.message}));
  },
};

module.exports = DetailsController;
