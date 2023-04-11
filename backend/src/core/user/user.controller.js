const UserService = require('./user.service');

const UserProvider = new UserService();

const getOne = async (req, res, next) => {
  try {
    const user = await UserProvider.getOne(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const allUsers = await UserProvider.getAll();

    console.log('ALL USERS', allUsers);
    // return allUsers;
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    await UserProvider.create(req.body);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await UserProvider.remove(req.params.id);

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
