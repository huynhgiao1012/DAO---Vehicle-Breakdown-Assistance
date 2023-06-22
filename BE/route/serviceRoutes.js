const express = require("express");
const serviceController = require("../controllers/serviceController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getAllService/:id",
  jwtAuth,
  authorize("company", "customer", "admin"),
  serviceController.getAllService
);
router.get(
  "/getServiceDetail/:id",
  jwtAuth,
  authorize("company", "customer", "admin"),
  serviceController.getService
);
router.post(
  "/create",
  jwtAuth,
  authorize("company", "admin"),
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
  authorize("company", "admin"),
  serviceController.deleteService
);
router.patch(
  "/:id",
  jwtAuth,
  authorize("company", "admin"),
  serviceController.updateService
);
module.exports = router;
