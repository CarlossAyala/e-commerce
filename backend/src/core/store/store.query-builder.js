const QueryBuilder = require('../../utils/database/query-builder');
const splitAndDecode = require('../../utils/split-and-decode');

class StoreQueryBuilder extends QueryBuilder {
  constructor(query) {
    super(query);
  }

  whereStoreId(id) {
    this.where('storeId', id);

    return this;
  }

  inCategories() {
    const categories = splitAndDecode(this.params.categories);
    this.whereIn('slug', categories);

    return this;
  }

  conditions() {
    const conditions = splitAndDecode(this.params.condition);
    this.whereIn('condition', conditions);

    return this;
  }

  isAvailable() {
    this.whereBoolean('available', 'true');

    return this;
  }

  priceRange() {
    const { price_gt, price_lt } = this.params;

    this.whereBetween('price', [price_gt, price_lt]);

    return this;
  }

  withStock() {
    const MIN_STOCK = 1;

    const { stock = 'true' } = this.params;

    if (stock === 'true') this.whereGTE('stock', MIN_STOCK);
    else this.whereLT('stock', MIN_STOCK);

    return this;
  }

  sort() {
    const { order_by = 'sold', order_dir = 'DESC' } = this.params;

    switch (order_by) {
      case 'price':
        this.orderBy('price', order_dir);
        break;
      case 'sold':
        this.orderBy('sold', order_dir);
        break;
      default:
        this.orderBy('sold', 'DESC');
    }

    return this;
  }
}

module.exports = StoreQueryBuilder;
