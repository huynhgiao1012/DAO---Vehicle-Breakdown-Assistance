const catchAsync = require("../middleware/async");
const User = require("../models/account");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const bcrypt = require("bcryptjs");
const Customer = require("../models/customer");
const Company = require("../models/company");
const Account = require("../models/account");
const { ROLES } = require("../constant");
const ApiError = require("../utils/ApiError");
// exports.createUser = catchAsync(async (req, res) => {
//   const { name, email, phone } = req.body;
//   var password = generator.generateMultiple(1, {
//     length: 10,
//     numbers: true,
//     symbols: true,
//     lowercase: true,
//     uppercase: true,
//     strict: true,
//   })[0];
//   const user = await User.create({
//     name,
//     email,
//     phone,
//     password,
//   });
//   const customer = await Customer.create({
//     accountId: user.id,
//   })
//   await EmailService.sendMail(
//     process.env.EMAIL,
//     email,
//     "WELCOME NEW USER",
//     `Your password is: ${password}`
//   );
//   res.status(200).json({
//     success: true,
//     data: {...user, ponit: customer.ponit},
//     message: "Successfull create new user",
//   });
// });
exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const customer = await Customer.findOne({ accountId: id });
  const company = await Company.findOne({ accountId: id });
  if (!user) {
    throw new ApiError(400, "This user is not available");
  }
  await user.remove();
  if (customer) {
    await customer.remove();
  }
  if (company) {
    await company.remove();
  }
  res.status(200).json({
    success: true,
    message: "Delete successfully !",
    data: user,
  });
});
exports.updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { name: name, phone: phone },
    { new: true }
  );
  if (!user) {
    throw new ApiError(400, "This user is not available");
  }
  res
    .status(200)
    .json({ success: true, message: "Update successfully", data: user });
});
exports.getAllUser = catchAsync(async (req, res) => {
  const data = await User.find({});
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await User.findById(id);
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getUserDetails = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await User.findById(id);
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getUserPoint = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await Customer.findOne({ accountId: id });
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.updateUserPoint = catchAsync(async (req, res) => {
  const id = req.user.id;
  const { point } = req.body;
  const Point = await Customer.findOne({ accountId: id });
  const data = await Customer.findOneAndUpdate(
    { accountId: id },
    { point: Number(point) + Number(Point.point) }
  );
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.updatePassword = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { oldPassword, newPassword } = req.body;
  const existEmail = await Account.findOne({ email: email });
  if (!existEmail) {
    throw new ApiError(400, "Email have no longer exists");
  }
  const isMatch = bcrypt.compareSync(oldPassword, existEmail.password);
  if (!isMatch) {
    throw new ApiError(400, "Old password does not match");
  } else {
    existEmail.password = newPassword;
    existEmail.save();
  }
  res.json({
    success: true,
    message: "Change successfully !",
  });
});
// exports.rechargeUserBalance = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const { amount } = req.body;
//   const user = await User.findById(id);
//   const balance = user.balance + amount;
//   const newUser = await User.findByIdAndUpdate(id, { balance }, { new: true });
//   res.status(200).json({
//     success: true,
//     newUser,
//     message: `Successful. The new balance is ${newUser.balance}`,
//   });
// });
// exports.rechargeBalance = catchAsync(async (req, res) => {
//   const { amount, cardNum, CVV, expiredDate } = req.body;
//   const userID = req.user.id;
//   const recharge = await Recharge.create({
//     amount,
//     userID,
//     cardNum,
//     CVV,
//     expiredDate,
//   });
//   const user = await User.findById(userID);
//   const balance = user.balance + amount;
//   const newUser = await User.findByIdAndUpdate(
//     userID,
//     { balance },
//     { new: true }
//   );
//   res.status(200).json({
//     success: true,
//     recharge,
//     message: `Successful. The new balance is ${newUser.balance}`
//   });
// });
