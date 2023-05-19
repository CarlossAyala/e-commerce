const Boom = require('@hapi/boom');
const JWT = require('../../utils/auth/JWT');
const encrypter = require('../../utils/encrypter');
const AccountService = require('./account.service');
const UserService = require('../user/user.service');

const AccountProvider = new AccountService();
const UserProvider = new UserService();

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserProvider.findByEmail(email);

    if (!user)
      return next(
        Boom.badRequest('Please provide a valid email address or password')
      );

    const validPassword = await encrypter.isValidPasswordAsync(
      password,
      user.password
    );

    if (!validPassword)
      return next(
        Boom.badRequest('Please provide a valid email address or password')
      );

    const { token, expirationDate } = JWT.sign({
      id: user.id,
    });

    delete user.dataValues.password;

    res.status(200).json({ jwt: token, expirationDate, user });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const user = await UserProvider.create(req.body);
    await AccountProvider.createCart(user.dataValues.id);

    res.status(201).json({
      message: 'Account created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const user = await UserProvider.getOne(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const changeName = async (req, res, next) => {
  try {
    const { id } = req.auth;

    await AccountProvider.changeName(id, req.body);

    res.status(200).json({
      message: 'Name changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { id } = req.auth;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await AccountProvider.getUserById(id);

    // Compare passwords
    const isEqual = await encrypter.isValidPasswordAsync(
      oldPassword,
      user.dataValues.password
    );

    if (!isEqual) return next(Boom.badRequest("Old password isn't valid"));

    await AccountProvider.changePassword(id, newPassword);

    res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  signup,
  profile,
  changeName,
  changePassword,
};

// TODO: Create a route to create user root or admin
