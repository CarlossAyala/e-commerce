const CardService = require('./card.service');

const CardProvider = new CardService();

const getOne = async (req, res, next) => {
  try {
    const card = await CardProvider.getOne(req.params.id);

    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const userId = req.auth.id;

    const cards = await CardProvider.getAll(userId);

    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newCard = {
      ...req.body,
      fkUser: req.auth.id,
    };

    await CardProvider.create(newCard);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await CardProvider.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOne,
  getAll,
  create,
  remove,
};
