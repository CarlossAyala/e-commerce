const fs = require("node:fs");
const crypto = require("node:crypto");
const path = require("node:path");
const handlebars = require("handlebars");
const resend = require("../../services/resend");
const { InternalServerError } = require("../../utils/http-errors");
const sequelize = require("../../db/mysql");
const Stripe = require("../../services/stripe");
const Formatter = require("../../utils/formatter");

const UserModel = sequelize.model("User");
const StoreModel = sequelize.model("Store");
const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");
const AddressModel = sequelize.model("Address");
const OrderModel = sequelize.model("Order");
const OrderItemModel = sequelize.model("OrderItem");

const templateCustomerPath = path.join(__dirname, "template-customer.hbs");
const templateCustomer = fs.readFileSync(templateCustomerPath, "utf-8");
const templateSellerPath = path.join(__dirname, "template-seller.hbs");
const templateSeller = fs.readFileSync(templateSellerPath, "utf-8");

/**
 * TODO: Here
 * - Add URLs in customer and seller emails in
 * -- Order Id
 * -- Product Name
 *
 * - Only send emails to real sellers (some stores come from seed data)
 */
module.exports = async (job) => {
  const { orderId } = job.data;

  const _order = await OrderModel.findByPk(orderId, { raw: true });
  const customer = await UserModel.findByPk(_order.userId, { raw: true });
  const _items = await OrderItemModel.findAll({
    where: { orderId },
    include: {
      model: ProductModel,
      as: "product",
      include: [
        {
          model: ProductGalleryModel,
          as: "gallery",
          required: false,
          order: [["order", "ASC"]],
          separate: true,
        },
      ],
    },
  });
  const address = await AddressModel.findByPk(_order.addressId, { raw: true });
  const paymentIntent = await Stripe.paymentIntents.retrieve(
    _order.paymentIntentId,
  );
  const paymentMethod = await Stripe.paymentMethods.retrieve(
    paymentIntent.payment_method,
  );

  const items = _items.map((item) => ({
    ...item.dataValues,
    total: Formatter.currency(
      item.dataValues.quantity * +item.dataValues.price,
    ),
    product: {
      ...item.dataValues.product.dataValues,
      url:
        item.dataValues.product.gallery[0]?.url ??
        "https://res.cloudinary.com/legger/image/upload/v1717958095/product-photo-placeholder.jpg",
    },
  }));
  const order = {
    ..._order,
    total: Formatter.currency(_order.total),
    createdAt: Formatter.fullDateTime(_order.createdAt),
  };

  const compiledTemplateCustomer = handlebars.compile(templateCustomer);
  const htmlCustomer = compiledTemplateCustomer({
    customer,
    items: items.map((item) => ({
      ...item,
      price: Formatter.currency(item.price),
    })),
    address,
    order,
    paymentMethod,
  });
  const customerEmail = await resend.emails.send({
    from: "Legger E-Commerce <onboarding@resend.dev>",
    to: "infocarlosayala@gmail.com",
    subject: "Order Placed",
    headers: {
      "X-Entity-Ref-ID": crypto.randomUUID(),
    },
    html: htmlCustomer,
  });
  if (customerEmail.error) {
    throw new InternalServerError(customerEmail.error);
  }

  // each product in the order has different stores
  const stores = new Map(items.map((item) => [item.product.storeId, []]));
  for (const item of items) {
    const store = item.product.storeId;
    stores.get(store).push(item);
  }
  await Promise.all(
    Array.from(stores.entries()).map(async ([storeId, items]) => {
      const store = await StoreModel.findByPk(storeId, { raw: true });
      // TODO: _seller is not used
      const _seller = await UserModel.findByPk(store.userId, { raw: true });

      const total = items.reduce(
        (acc, item) => acc + +item.price * item.quantity,
        0,
      );
      const compiledTemplateSeller = handlebars.compile(templateSeller);
      const htmlSeller = compiledTemplateSeller({
        items: items.map((item) => ({
          ...item,
          price: Formatter.currency(item.price),
        })),
        order: {
          id: orderId,
          total: Formatter.currency(total),
          createdAt: order.createdAt,
        },
      });
      const sellerEmail = await resend.emails.send({
        from: "Legger Seller <onboarding@resend.dev>",
        to: "infocarlosayala@gmail.com",
        subject: "New order placed",
        headers: {
          "X-Entity-Ref-ID": crypto.randomUUID(),
        },
        html: htmlSeller,
      });
      if (sellerEmail.error) {
        throw new InternalServerError(sellerEmail.error);
      }
    }),
  );
};
