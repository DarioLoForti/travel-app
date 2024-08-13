const express = require("express");
const router = express.Router();
const { paramID } = require("../validations/id");
const validator = require("../middleware/validator");
const { store, index, show } = require("../controllers/daysController");

router.get("/", index);

router.post("/", validator, store);

router.use("/:id", validator(paramID));

router.get("/:id", show);

module.exports = router;
