// backend/routes/formRoutes.js
const express = require("express");
const router = express.Router();
const {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
  submitForm,
} = require("../controllers/formController");

router.route("/").get(getForms).post(createForm);

router.route("/:id").get(getForm).put(updateForm).delete(deleteForm);

router.post("/:id/submit", submitForm);

module.exports = router;
