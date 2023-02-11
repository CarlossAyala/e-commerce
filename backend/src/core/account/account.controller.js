const Boom = require('@hapi/boom');
const JWT = require('../../utils/auth/JWT');
const encrypter = require('../../utils/encrypter');
const UserService = require('../user/user.service');

const UserProvider = new UserService();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundAccount = await UserProvider.findByEmail(email);

    if (!foundAccount)
      return next(
        Boom.badRequest('Please provide a valid email address or password')
      );

    const validPassword = await encrypter.isValidPasswordAsync(
      password,
      foundAccount.password
    );

    if (!validPassword)
      return next(
        Boom.badRequest('Please provide a valid email address or password')
      );

    const { token, expirationDate } = JWT.sign({
      id: foundAccount.id,
    });

    res.status(200).json({ token, expirationDate });
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

module.exports = {
  login,
  signup,
};

// TODO: Create a route to create user root or admin
