const { Payments, validatePayment } = require("../models/Payments");

const PaymentsController = {
  getall(req, res) {
    Payments.find()
      .then((payment) => res.send(payment))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  getByid(req, res) {
    Payments.findById(req.params.id)
      .then((payment) => res.send(payment))
      .catch((err) => res.send({ success: false, message: err.message }));
  },
  addPayment(req, res) {
    const { error } = validatePayment(req.body);
    if (error) res.status(400).send(error);
    Payments.findOne({ payment_type: req.body.payment_type }).then((paym) => {
      if (paym) {
        //update
        Payments.findByIdAndUpdate(paym._id, { $set: req.body }, { new: true })
          .then((done) => res.send(done))
          .catch((err) => console.log(err));

        return;
      }

      //create new
      Payments.create({
        payment_type: req.body.payment_type,
        payment_status: req.body.payment_status,
        payment_date: req.body.date,
        allowed:
          req.body.allowed === "true" || req.body.allowed === true
            ? true
            : false,
      })
        .then((payment) => res.send(payment))
        .catch((err) => console.log(err));
    });
  },
  deletePayment(req, res) {
    Payments.findByIdAndDelete(req.params.id)
      .then((paym) => {
        if (paym) return res.send({ success: true });
        res.send("Payment not found.");
      })
      .catch((err) => console.log(err));
  },
};

module.exports = PaymentsController;
