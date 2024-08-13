const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const errorHandler = require("../middlewares/errorHandler");
const RestError = require("../utils/RestError");

const store = async (req, res) => {
  try {
    const { travelId, data } = req.body;
    const newDay = await prisma.days.create({
      data: {
        travelId: parseInt(travelId),
        data: new Date(data),
      },
    });
    res.status(200).send(newDay);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const days = await prisma.days.findMany();
    res.json({ data: days });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const day = await prisma.days.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (day) {
      res.json({ data: day });
    } else {
      throw new RestError(`Day with id ${id} not found`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  store,
  index,
  show,
};
