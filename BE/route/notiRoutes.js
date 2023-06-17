const express = require("express");
const notiController = require("../controllers/notiController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getUnreadNotification",
  jwtAuth,
  authorize("company", "customer"),
  notiController.getUnreadNotification
);
router.get(
  "/getReadNotification",
  jwtAuth,
  authorize("company", "customer"),
  notiController.getReadNotification
);
router.post(
  "/create",
  jwtAuth,
  authorize("company", "customer"),
  notiController.createNotification
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("company", "customer"),
  notiController.deleteNotification
);
router.patch(
  "/updateNoti/:id",
  jwtAuth,
  authorize("company", "customer"),
  notiController.updateNotification
);
module.exports = router;
