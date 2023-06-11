const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    num: {
      type: Number,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Notification",
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
