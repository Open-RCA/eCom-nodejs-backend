const OrderDetails = require("../models/OrderDetails");

const DetailsController = {
  getall(req, res) {
    OrderDetails.find()
      .then((details) => res.send(details))
      .catch((err) => console.log(err));
  },
  getByid(req, res) {
    OrderDetails.findById(req.params.id)
      .then((details) => res.send(details))
      .catch((err) => console.log(err));
  },
  addDetails(req, res) {
    OrderDetails.create({
      orderId: req.body.orderId,
      productId: req.body.productId,
      price: req.body.price,
      quantity: req.body.quantity,
      total: req.body.total,
    })
      .then((details) => res.send(details))
      .catch((err) => console.log(err));
  },
  deleteDetails(req, res) {
    OrderDetails.findByIdAndDelete(req.params.id)
      .then((details) => res.send({ success: true }))
      .catch((err) => console.log(err));
  },
};

module.exports = DetailsController;
