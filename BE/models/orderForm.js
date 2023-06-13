const mongoose = require("mongoose");
const { FORM_STATUS } = require("../constant");
const Schema = mongoose.Schema;
const OrderFormSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    garageId: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: FORM_STATUS,
      default: FORM_STATUS.AWAIT,
    },
    price: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    creatAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "OrderForm",
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderForm", OrderFormSchema);
