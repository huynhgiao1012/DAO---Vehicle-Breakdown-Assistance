const express = require("express");
const serviceController = require("../controllers/serviceController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getAllService/:id",
  jwtAuth,
  authorize("company", "customer"),
  serviceController.getAllService
);
router.get(
  "/getServiceDetail/:id",
  jwtAuth,
  authorize("company", "customer"),
  serviceController.getService
);
router.post(
  "/create",
  jwtAuth,
  authorize("company"),
  serviceController.createService
);
router.post(
  "/bookingService",
  jwtAuth,
  authorize("customer"),
  serviceController.bookingService
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("company"),
  serviceController.deleteService
);
router.patch(
  "/:id",
  jwtAuth,
  authorize("company"),
  serviceController.updateService
);
module.exports = router;
