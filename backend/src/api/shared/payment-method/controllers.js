const Stripe = require("../../../services/stripe");
const { NotFound } = require("../../../utils/http-errors");

const validatePaymentMethodId = async (req, _res, next, paymentMethodId) => {
  const { customer } = req.stripe;

  try {
    const paymentMethod = await Stripe.customers.retrievePaymentMethod(
      customer.id,
      paymentMethodId,
    );
    if (!paymentMethod) {
      throw new NotFound("Payment not found");
    }

    req.paymentMethod = paymentMethod;
    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { customer } = req.stripe;

  try {
    const { data: paymentMethods } = await Stripe.customers.listPaymentMethods(
      customer.id,
      {
        type: "card",
      },
    );

    res.json(paymentMethods);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { paymentMethod } = req;

  try {
    res.json(paymentMethod);
  } catch (error) {
    next(error);
  }
};

const findSession = async (req, res, next) => {
  const { customer } = req.stripe;
  const { sessionId } = req.params;

  try {
    const session = await Stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["setup_intent"],
    });
    if (!session || customer.id !== session.customer) {
      throw new NotFound("Checkout session not found");
    }

    res.json({
      id: session.setup_intent.payment_method,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { customer } = req.stripe;
  const { paymentIntentId, addressId } = req.body;

  const { origin } = req.headers;
  try {
    let success_url = `${origin}/checkout/${paymentIntentId}/payment-method?session_id={CHECKOUT_SESSION_ID}`;
    if (addressId) {
      success_url = success_url.concat(`&address_id=${addressId}`);
    }

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: customer.id,
      success_url,
      cancel_url: origin,
    });

    res.json(session.url);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { paymentMethodId } = req.params;

  try {
    await Stripe.paymentMethods.detach(paymentMethodId);

    res.json({ message: "Payment method deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validatePaymentMethodId,
  findAll,
  findOne,
  findSession,
  create,
  remove,
};
