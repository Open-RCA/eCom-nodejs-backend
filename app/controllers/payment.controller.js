const Payments = require("../models/Payments");

const PaymentsController = {
  getall(req, res) {
    Payments.find()
      .then((payment) => res.send(payment))
      .catch((err) => res.send({success: false, message: err.message}));
  },
  getByid(req, res) {
    Payments.findById(req.params.id)
      .then((payment) => res.send(payment))
      .catch((err) => res.send({success: false, message: err.message}));
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
      .catch((err) => res.send({success: false, message: err.message}));
  },
  deletePayment(req, res) {
    Payments.findByIdAndDelete(req.params.id)
      .then((paym) => res.send({ success: true }))
      .catch((err) => res.send({success: false, message: err.message}));
  },
};

module.exports = PaymentsController;
