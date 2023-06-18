const express = require("express");
const formController = require("../controllers/orderFormController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getAllFormCustomer",
  jwtAuth,
  authorize("customer"),
  formController.getAllFormByCustomer
);
router.get(
  "/getAllFormGarage",
  jwtAuth,
  authorize("company"),
  formController.getAllFormByGarage
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("company", "customer"),
  formController.deleteForm
);
router.get(
  "/getFormDetail/:id",
  jwtAuth,
  authorize("company", "customer"),
  formController.getFormDetail
);
router.patch(
  "/updateProcess/:id",
  jwtAuth,
  authorize("company"),
  formController.updateProcessForm
);
router.patch(
  "/updateDone/:id",
  jwtAuth,
  authorize("company"),
  formController.updateDoneForm
);
module.exports = router;
