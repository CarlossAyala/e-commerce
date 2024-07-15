"use strict";

const crypto = require("node:crypto");
const { admin } = require("../../../config");
// const Stripe = require("../../../services/stripe");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const [[user]] = await queryInterface.sequelize.query(
      "SELECT * FROM `Users` WHERE `email` = ?",
      {
        replacements: [admin.email],
      },
    );
    const [[address]] = await queryInterface.sequelize.query(
      "SELECT * FROM `Addresses` WHERE `userId` = ? LIMIT 1",
      {
        replacements: [user.id],
      },
    );
    const [products] = await queryInterface.sequelize.query(
      "SELECT * FROM Products ORDER BY RAND() LIMIT 30",
    );

    // const {
    //   data: [customer],
    // } = await Stripe.customers.search({
    //   query: `email:"${admin.email}"`,
    //   limit: 1,
    // });

    await Promise.all(
      products.map(async (product) => {
        let purchases = 50;
        while (purchases > 0) {
          const quantity = 1;
          const TO_CENTS = 100;
          const amount = product.price * quantity * TO_CENTS;
          // const pi = await Stripe.paymentIntents.create({
          //   amount,
          //   currency: "usd",
          //   customer: customer.id,
          //   // https://docs.stripe.com/testing#test-code
          //   payment_method: "pm_card_visa",
          //   automatic_payment_methods: {
          //     enabled: true,
          //     allow_redirects: "never",
          //   },
          //   confirm: true,
          // });

          const order = {
            id: crypto.randomUUID(),
            total: amount,
            // paymentIntentId: pi.id,
            userId: user.id,
            addressId: address.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          const items = [
            {
              id: crypto.randomUUID(),
              quantity,
              price: product.price,
              orderId: order.id,
              productId: product.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];

          await queryInterface.bulkInsert("Orders", [order]);
          await queryInterface.bulkInsert("OrderItems", items);

          purchases--;
        }
      }),
    );
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Orders", null, {});
    await queryInterface.bulkDelete("OrderItems", null, {});
  },
};
