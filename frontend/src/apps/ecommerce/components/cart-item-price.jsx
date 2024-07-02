import { Formatter } from "@/shared/utils";

export const CartItemPrice = ({ item }) => {
  const price = item.product.price * item.quantity;

  return (
    <div className="flex h-7 items-center">
      <p className="text-base font-medium leading-3">
        {Formatter.currency(price)}
      </p>
    </div>
  );
};
