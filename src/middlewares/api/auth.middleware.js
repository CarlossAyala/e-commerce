// const Boom = require('@hapi/boom');
const { expressjwt: jwt } = require('express-jwt');

const { jwt_secret } = require('../../config');

const validateJWT = jwt({
  secret: jwt_secret,
  algorithms: ['HS256'], // TODO: Preguntar si esto viene del .env
});

// const checkRoles = (roles) => {
//   return async (req, res, next) => {
//     const user = await UserModel.findById(req.user._id);

//     if (!roles.includes(user.roles))
//       return next(Boom.unauthorized('You dont have roles for this'));

//     next();
//   };
// };

module.exports = {
  validateJWT,
  // validateGuestPermissions,
  // checkRoles,
};

// TODO: Podría usarlo
// const validateGuestPermissions = (request, response, next) => {
//   if (request.headers.authorization) {
//     return next();
//   }

//   return response.status(251).json({
//     roles: ['GUEST'],
//     permissions: [],
//   });
// };
