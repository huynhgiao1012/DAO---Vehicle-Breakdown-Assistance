const catchAsync = require("../middleware/async");
const Feedback = require("../models/feedback");
const ApiError = require("../utils/ApiError");

exports.createFeedback = catchAsync(async (req, res) => {
  const { customerId, garageId, rating, review } = req.body;
  const fb = await Feedback.create({
    customerId: customerId,
    garageId: garageId,
    rating: rating,
    review: review,
  });
  res.status(200).json({
    success: true,
    fb,
  });
});
exports.deleteFeedback = catchAsync(async (req, res) => {
  const { id } = req.params;
  const fb = await Feedback.findById(id);
  if (!fb) {
    throw new ApiError(400, "Feedback is not available");
  }
  await fb.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully!",
    data: fb,
  });
});
exports.getAllFeedback = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Feedback.find({ garageId: id }).populate(
    "customerId",
    "name _id"
  );
  if (!data) {
    throw new ApiError(400, "Feedback is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
