const Payments = require("../models/Payments");

const PaymentsController = {
  getall(req, res) {
    Payments.find()
      .then((payment) => res.send(payment))
      .catch((err) => console.log(err));
  },
  getByid(req, res) {
    Payments.findById(req.params.id)
      .then((payment) => res.send(payment))
      .catch((err) => console.log(err));
  },
  addPayment(req, res) {
    Payments.create({
      payment_type: req.body.payment_type,
      payment_status: req.body.payment_status,
      payment_date: req.body.date,
      allowed:
        req.body.allowed === "true" || req.body.allowed === true ? true : false,
    })
      .then((payment) => res.send(payment))
      .catch((err) => console.log(err));
  },
  deletePayment(req, res) {
    Payments.findByIdAndDelete(req.params.id)
      .then((paym) => res.send({ success: true }))
      .catch((err) => console.log(err));
  },
};

module.exports = PaymentsController;
