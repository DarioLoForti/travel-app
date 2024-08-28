const express = require("express");
const router = express.Router();
const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/stageController");

const validator = require("../middlewares/validator");
const { paramID } = require("../validations/id");
const { bodyData } = require("../validations/stage");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/stage",
  filename: (req, file, cb) => {
    const fileType = path.extname(file.originalname);
    cb(null, String(Date.now()) + fileType);
  },
});

const upload = multer({ storage });

router.get("/", index);

router.post("/", [upload.single("stage"), validator(bodyData)], store);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.put("/:id", [upload.single("stage"), validator(bodyData)], update);

router.delete("/:id", destroy);

module.exports = router;
