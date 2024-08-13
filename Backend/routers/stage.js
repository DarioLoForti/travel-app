const express = require("express");
const router = express.Router();
const { paramID } = require("../validations/id");
const validator = require("../middleware/validator");
const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/stageController");

router.get("/", index);

router.post("/", validator, store);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.put("/:id", validator, update);

router.delete("/:id", destroy);

module.exports = router;
