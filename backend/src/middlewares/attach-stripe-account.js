const Stripe = require("../services/stripe");
const { NotFound } = require("../utils/http-errors");

const attachStripeAccount = async (req, res, next) => {
  const { email } = req.user;

  try {
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
      limit: 1,
    });
    const [customer] = data;
    if (!customer) {
      return next(new NotFound("Stripe Account not found"));
    }

    req.stripe = { customer };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = attachStripeAccount;
