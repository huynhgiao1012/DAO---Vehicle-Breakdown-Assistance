const { FORM_STATUS } = require("../constant");
const catchAsync = require("../middleware/async");
const orderForm = require("../models/orderForm");
const ApiError = require("../utils/ApiError");

exports.deleteForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await orderForm.findById(id);
  if (!noti) {
    throw new ApiError(400, "Notification is not available");
  }
  await noti.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully!",
    data: noti,
  });
});
exports.updateProcessForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await orderForm.findByIdAndUpdate(id, {
    status: FORM_STATUS.PROCESS,
  });
  if (!noti) {
    throw new ApiError(400, "Form is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
  });
});
exports.updateDoneForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await orderForm.findByIdAndUpdate(id, {
    status: FORM_STATUS.DONE,
  });
  if (!noti) {
    throw new ApiError(400, "Form is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
  });
});
exports.getAllFormByCustomer = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await orderForm
    .find({ customerId: id })
    .populate("garageId", "name email phone _id")
    .populate("serviceId", "type price description _id");
  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getAllFormByGarage = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await orderForm
    .find({ garageId: id })
    .populate("customerId", "name email phone _id")
    .populate("serviceId", "type price description _id");
  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
