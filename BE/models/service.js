const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Service",
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
