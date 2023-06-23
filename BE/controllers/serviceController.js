const catchAsync = require("../middleware/async");
const orderForm = require("../models/orderForm");
const Service = require("../models/service");
const ApiError = require("../utils/ApiError");
const { io } = require("socket.io-client");
// _id.valueOf() --> lấy id từ object id
exports.createService = catchAsync(async (req, res) => {
  const { type, price, description } = req.body;
  const { id } = req.user;
  const service = await Service.create({
    accountId: id,
    type,
    price,
    description,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.addService = catchAsync(async (req, res) => {
  const { type, price, description } = req.body;
  const { id } = req.params;
  const service = await Service.create({
    accountId: id,
    type,
    price,
    description,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  await service.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully!",
    data: service,
  });
});
exports.updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { type, price, description } = req.body;
  const service = await Service.findByIdAndUpdate(
    id,
    { type: type, price: price, description: description },
    { new: true }
  );
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
    serviceInfor: service,
  });
});
exports.getAllService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Service.find({ accountId: id });
  if (!data) {
    throw new ApiError(400, "Service is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const serviceDetail = await Service.findById({ _id: id });
  if (!serviceDetail) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    serviceDetail,
  });
});
exports.getService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const serviceDetail = await Service.findById({ _id: id });
  if (!serviceDetail) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    serviceDetail,
  });
});
exports.bookingService = catchAsync(async (req, res) => {
  const { customerId, garageId, serviceId, address, date, price, note } =
    req.body;
  const booking = await orderForm.create({
    customerId: customerId,
    garageId: garageId,
    serviceId: serviceId,
    address: address,
    date: date,
    price: price,
    note: note,
  });
  res.status(200).json({
    success: true,
    booking,
  });
});
