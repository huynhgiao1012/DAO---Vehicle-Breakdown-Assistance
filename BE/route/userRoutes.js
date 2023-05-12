const express = require("express");
const userController = require("../controllers/userController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.get("/", jwtAuth, authorize("admin"), userController.getAllUser);
router.get("/detail/:id", jwtAuth, authorize("admin"), userController.getUser);
router.get(
  "/detail",
  jwtAuth,
  authorize("user"),
  userController.getUserDetails
);
router.patch("/:id", jwtAuth, authorize("admin"), userController.updateUser);
router.delete("/:id", jwtAuth, authorize("admin"), userController.deleteUser);
module.exports = router;
