const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;
const errorHandler = require("../middlewares/errorHandler");
const RestError = require("../utils/RestError");

const store = async (req, res) => {
  try {
    const { title } = req.body;
    const newTravel = await prisma.travel.create({
      data: {
        title,
      },
    });
    res.status(200).send(newTravel);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const travels = await prisma.travel.findMany({
      include: {
        days: {
          include: {
            stages: true,
          },
        },
      },
    });
    res.json({ data: travels });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const travel = await prisma.travel.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        days: {
          include: {
            stages: true,
          },
        },
      },
    });
    if (travel) {
      res.json({ travel });
    } else {
      throw new RestError(`Travel with id ${id} not found`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const travel = await prisma.travel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
      },
    });
    res.json({ travel });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.travel.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Travel deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
