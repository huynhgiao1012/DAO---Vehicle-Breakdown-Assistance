const express = require("express");
const userController = require("../controllers/userController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.post("/updatePassword", jwtAuth, userController.updatePassword);
router.get("/", jwtAuth, authorize("admin"), userController.getAllUser);
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
router.patch("/:id", jwtAuth, authorize("admin"), userController.updateUser);
router.delete("/:id", jwtAuth, authorize("admin"), userController.deleteUser);
module.exports = router;
