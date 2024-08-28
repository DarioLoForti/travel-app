const express = require("express");
const router = express.Router();
const { paramID } = require("../validations/id");
const validator = require("../middlewares/validator");
const { store, index, show } = require("../controllers/daysController");

router.get("/", index);

router.post("/", store);

router.use("/:id", validator(paramID));

router.get("/:id", show);

module.exports = router;
