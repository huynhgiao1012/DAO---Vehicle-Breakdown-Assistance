const mongoose = require("mongoose");
const { NOTI_STATUS } = require("../constant");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: "true",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: "true",
    },
    text: {
      type: String,
      required: "true",
    },
    status: {
      type: String,
      enum: NOTI_STATUS,
      default: NOTI_STATUS.UNREAD,
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
