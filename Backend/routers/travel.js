const express = require("express");
const router = express.Router();
const { paramID } = require("../validations/id");
const validator = require("../middlewares/validator");
const { bodyData } = require("../validations/travel");
const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/travelsController");

router.get("/", index);

router.post("/", validator(bodyData), store);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.put("/:id", validator(bodyData), update);

router.delete("/:id", destroy);

module.exports = router;
