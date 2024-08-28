const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const errorHandler = require("../middlewares/errorHandler");
const RestError = require("../utils/RestError");

const store = async (req, res) => {
  try {
    const { title, description, rating, notes, dayId } = req.body;
    const data = {
      title,
      description,
      rating: parseInt(rating),
      notes,
      dayId: parseInt(dayId),
    };
    if (req.file) {
      data.image = `${HOST}:${port}/stage/${req.file.filename}`;
    }

    const newStage = await prisma.stage.create({
      data,
    });
    res.status(200).send(newStage);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const stages = await prisma.stage.findMany();
    res.json({ data: stages });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const stage = await prisma.stage.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (stage) {
      res.json({ stage });
    } else {
      throw new RestError(`Stage with id ${id} not found`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, rating, notes } = req.body;
    const data = {
      title,
      description,
      rating: parseInt(rating),
      notes,
    };
    if (req.file) {
      data.image = `${HOST}:${port}/stage/${req.file.filename}`;
    }
    const updatedStage = await prisma.stage.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
    res.status(200).send(updatedStage);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.stage.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(`Stage with id ${id} deleted`);
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
