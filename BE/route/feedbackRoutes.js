const express = require("express");
const feedbackController = require("../controllers/feedbackController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getAllFeedbacks/:id",
  jwtAuth,
  authorize("company", "customer"),
  feedbackController.getAllFeedback
);

router.post(
  "/create",
  jwtAuth,
  authorize("customer"),
  feedbackController.createFeedback
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("company"),
  feedbackController.deleteFeedback
);

module.exports = router;
