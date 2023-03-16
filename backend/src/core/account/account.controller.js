const Boom = require('@hapi/boom');
const JWT = require('../../utils/auth/JWT');
const encrypter = require('../../utils/encrypter');
const UserService = require('../user/user.service');

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
    await UserProvider.create(req.body);

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

module.exports = {
  signin,
  signup,
  profile,
};

// TODO: Create a route to create user root or admin
