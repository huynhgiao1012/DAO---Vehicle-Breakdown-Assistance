const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PaymentSchema = new Schema(
  {
    paymentStatus: {
      type: Boolean,
      default: false,
      required: [true, "Payment Status is required"],
    },
    formID: {
      type: mongoose.Types.ObjectId,
      ref: "orderForm",
    },
  },
  {
    collection: "payments",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Payment", PaymentSchema);
