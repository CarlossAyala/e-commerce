const CardService = require('./card.service');

const CardProvider = new CardService();

const getOne = async (req, res, next) => {
  try {
    const resoure = await CardProvider.getOne(req.params.id);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const resources = await CardProvider.getAll(userId);

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.auth.id;

    const resource = await CardProvider.create({ ...req.body, userId });

    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await CardProvider.remove(req.params.id);

    res.status(200).json({
      message: 'Removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    await CardProvider.update(req.params.id, req.body);

    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  remove,
};
