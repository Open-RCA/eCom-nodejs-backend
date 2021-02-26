const {
  OrderDetails,
  validateOrderDetails,
} = require("../models/OrderDetails");
const { Order } = require("../models/Order.model");

const DetailsController = {
  getall(req, res) {
    OrderDetails.find()
      .then((details) => res.send({ success: true, data: details }))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  getByid(req, res) {
    OrderDetails.findById(req.params.id)
      .then((details) => res.send({ success: true, data: details }))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  addDetails(req, res) {
    const { error } = validateOrderDetails(req.body);
    if (error) return res.status(400).send(error);

    Order.findById(req.body.orderId)
      .then((order) => {
        if (!order) return res.status(400).send("Order doesn't exist");
        OrderDetails.findOne({
          orderId: req.body.orderId,
          productId: req.body.productId,
        }).then((odetails) => {
          if (odetails) {
            //update
            OrderDetails.findByIdAndUpdate(odetails._id, { $set: req.body })
              .then((updated) => res.send(updated))
              .catch((err) => console.log(err));
            return;
          }

          //create new
          OrderDetails.create({
            orderId: req.body.orderId,
            productId: req.body.productId,
            price: req.body.price,
            quantity: req.body.quantity,
            total: req.body.total,
          })
            .then((details) => res.send(details))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  },
  deleteDetails(req, res) {
    OrderDetails.findByIdAndDelete(req.params.id)
      .then((details) => {
        if (details) return res.send({ success: true });
        res.status(400).send("Details not found");
      })
      .catch((err) => console.log(err));
  },
};

module.exports = DetailsController;
