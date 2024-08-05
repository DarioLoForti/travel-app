const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at ${HOST}:${port}`);
});
