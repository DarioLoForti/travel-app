const { checkSchema, validationResult } = require("express-validator");
const deleteImage = require("../utils/deleteImage");

module.exports = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file) {
          const Folder = "stage";
          deleteImage(Folder, req.file.filename);
        }
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
