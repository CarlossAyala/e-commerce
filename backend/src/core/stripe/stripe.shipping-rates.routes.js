const express = require("express");
const Stripe = require("./stripe.connection");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const shippingRates = await Stripe.shippingRates.list({
      limit: 3,
    });

    return res.status(200).json(shippingRates);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id = "shr_1NIJlYARNTjegl3VM99JU94Y" } = req.params;

  try {
    const shippingRate = await Stripe.shippingRates.retrieve(id);

    return res.status(200).json(shippingRate);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const shippingRate = await Stripe.shippingRates.create({
      display_name: "Ground shipping",
      type: "fixed_amount",
      fixed_amount: { amount: 500, currency: "usd" },
    });

    return res.status(200).json(shippingRate);
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  const { id = "shr_1NIJlYARNTjegl3VM99JU94Y" } = req.params;

  try {
    const shippingRate = await Stripe.shippingRates.update(id, {
      metadata: { order_id: "6735" },
    });

    return res.status(200).json(shippingRate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
