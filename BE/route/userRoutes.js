const express = require("express");
const userController = require("../controllers/userController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.post("/updatePassword", jwtAuth, userController.updatePassword);
router.get(
  "/getAllUser",
  jwtAuth,
  authorize("admin"),
  userController.getAllUser
);
router.get("/detail/:id", jwtAuth, authorize("admin"), userController.getUser);
router.get(
  "/userDetail",
  jwtAuth,
  authorize("customer", "company"),
  userController.getUserDetails
);
router.get(
  "/userPoint",
  jwtAuth,
  authorize("customer", "company"),
  userController.getUserPoint
);
router.patch(
  "/updateUserPoint",
  jwtAuth,
  authorize("customer"),
  userController.updateUserPoint
);
router.patch(
  "/:id",
  jwtAuth,
  authorize("admin", "customer", "company"),
  userController.updateUser
);
router.patch(
  "/",
  jwtAuth,
  authorize("admin", "customer", "company"),
  userController.updateUserDetail
);
router.delete("/:id", jwtAuth, authorize("admin"), userController.deleteUser);
module.exports = router;
