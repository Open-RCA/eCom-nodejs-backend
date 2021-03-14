const {
  OrderDetails,
  validateOrderDetails,
} = require("../models/OrderDetails");

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
  validateProducts(products) {
    for (let i = 0; i < products.length; i++) {
      let { error } = validateOrderDetails(products[i]);
      if (error)
        return {
          status: false,
          error,
        };
    }
    return {
      status: true,
      error: {},
    };
  },
  async addProducts(req, res) {
    const { error, status } = this.validateProducts(req.body.products);
    if (!status)
      return res.status(400).send({ response: error, message: "Failed." });
    OrderDetails.create(req.body.products)
      .then((docs) =>
        res.send({ success: true, message: "Successfully made order." })
      )
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
