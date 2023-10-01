import { Badge } from "../../../../../../components";
import { Formatter } from "../../../../../../utils/formatter";
import { AddToBookmark } from "./add-to-bookmark";
import { AddToCart } from "./add-to-cart";
import ProductStat from "./product-stat";
import { ProductStore } from "./product-store";

export const ProductDetail = ({ product }) => {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:gap-4">
      <div className="grow space-y-2">
        <header className="flex items-start justify-between gap-x-4 sm:hidden">
          <Badge variant="outline" className="capitalize">
            {product.condition}
          </Badge>
          <ProductStat productId={product.id} />
          <p className="text-sm font-medium leading-tight text-muted-foreground">
            {product.sold} sold
          </p>
        </header>
        <div className="sm:hidden">
          <h1 className="text-xl font-semibold leading-snug">{product.name}</h1>
        </div>
        <div className="h-96 w-full">
          <img
            className="h-full w-full object-contain object-center"
            src="https://http2.mlstatic.com/D_NQ_NP_651885-MLA31088151129_062019-O.webp"
            alt={`${product.name} image`}
          />
        </div>
      </div>

      <div className="max-w-xs shrink-0 grow space-y-5">
        <header className="hidden items-start justify-between gap-x-4 sm:flex">
          <Badge variant="outline" className="capitalize">
            {product.condition}
          </Badge>
          <ProductStat productId={product.id} />
          <p className="text-sm font-medium leading-tight text-muted-foreground">
            {product.sold} sold
          </p>
        </header>
        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold leading-snug">{product.name}</h1>
        </div>
        <div>
          <p className="text-3xl leading-tight">
            {Formatter.money(product.price)}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium leading-tight">Description</h2>
          <p className="text-sm leading-tight text-muted-foreground">
            {product.description}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium leading-tight">Stock</h2>
          <p className="text-sm leading-tight text-muted-foreground">
            {product.stock}
          </p>
        </div>
        <AddToCart product={product} />
        <AddToBookmark productId={product.id} />

        <section className="space-y-2">
          <h2 className="text-base font-semibold leading-snug">
            Store Information
          </h2>
          <ProductStore productId={product.id} />
        </section>
      </div>
    </div>
  );
};
