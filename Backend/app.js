const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const travelsRouter = require("./routers/travel");
const stagesRouter = require("./routers/stage");
const daysRouter = require("./routers/day");
const authRouter = require("./routers/auth");

require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

app.use(express.static("public"));

app.use(cors());
app.use(express.json());

app.use("/travels", travelsRouter);

app.use("/days", daysRouter);

app.use("/stages", stagesRouter);

app.use("/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at ${HOST}:${port}`);
});
