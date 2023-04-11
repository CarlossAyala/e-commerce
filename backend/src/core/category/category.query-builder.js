const QueryBuilder = require('../../utils/database/query-builder');
const splitAndDecode = require('../../utils/split-and-decode');

class CategoryQueryBuilder extends QueryBuilder {
  constructor(query) {
    super(query);
  }

  whereCategoryId(id) {
    this.where('categoryId', id);

    return this;
  }

  whereBusinessId(id) {
    this.where('businessId', id);

    return this;
  }

  storeNames() {
    const stores = splitAndDecode(this.params.stores);
    this.whereIn('name', stores);

    return this;
  }

  conditions() {
    const conditions = splitAndDecode(this.params.conditions);
    this.whereIn('condition', conditions);

    return this;
  }

  isAvailable() {
    const { available = 'true' } = this.params;

    this.whereBoolean('available', available);

    return this;
  }

  officialStores() {
    if (this.params.official === 'true') {
      this.whereBoolean('official', this.params.official);
    }

    return this;
  }

  priceRange() {
    const { price_gt = 0, price_lt = 0 } = this.params;

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
    // Sort by most sold
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

module.exports = CategoryQueryBuilder;
