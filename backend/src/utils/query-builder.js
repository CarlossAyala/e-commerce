const { Op } = require("sequelize");

class QueryBuilder {
  constructor(query) {
    this.filters = {};
    this._where = {};
    this.order = [];
    this.params = query;
  }

  getSortDirection(dir) {
    return dir === "ASC" ? "ASC" : "DESC";
  }
  getBooleanValue(bool) {
    return bool === "true";
  }

  where(fieldName, value) {
    if (value) {
      this._where[fieldName] = value;
    }
    return this;
  }

  whereIn(fieldName, values) {
    if (Array.isArray(values) && values.length) {
      this._where[fieldName] = { [Op.in]: values };
    }
    return this;
  }

  whereGT(fieldName, value) {
    if (+value) {
      this._where[fieldName] = { [Op.gt]: +value };
    }
    return this;
  }

  whereGTE(fieldName, value) {
    if (+value) {
      this._where[fieldName] = { [Op.gte]: +value };
    }
    return this;
  }

  whereLT(fieldName, value) {
    if (+value) {
      this._where[fieldName] = { [Op.lt]: +value };
    }
    return this;
  }

  whereLTE(fieldName, value) {
    if (+value) {
      this._where[fieldName] = { [Op.lte]: +value };
    }
    return this;
  }

  whereLike(fieldName, value) {
    if (value) {
      this._where[fieldName] = { [Op.substring]: value };
    }
    return this;
  }

  whereNot(fieldName, value) {
    if (value) {
      this._where[fieldName] = { [Op.not]: value };
    }
    return this;
  }

  whereNE(fieldName, value) {
    if (value) {
      this._where[fieldName] = { [Op.ne]: value };
    }
    return this;
  }

  whereBetween(fieldName, [from, to]) {
    if (!from || !to) return this;

    this._where[fieldName] = { [Op.between]: [+from, +to] };

    return this;
  }

  whereBoolean(fieldName, value) {
    const bool = this.getBooleanValue(value);

    this._where[fieldName] = bool;

    return this;
  }

  orderBy(fieldName, direction = "ASC") {
    if (fieldName) {
      this.order.push([fieldName, this.getSortDirection(direction)]);
    }
    return this;
  }

  get page() {
    const MIN_PAGE = 1;
    const { page: _page = MIN_PAGE } = this.params ?? {};
    if (+_page < MIN_PAGE || !Number.isInteger(+_page)) {
      return MIN_PAGE;
    }

    return +_page;
  }

  get limit() {
    const MIN_LIMIT = 10;
    const { limit: _limit = MIN_LIMIT } = this.params ?? {};
    const LIMITS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    if (
      +_limit < MIN_LIMIT ||
      !Number.isInteger(+_limit) ||
      !LIMITS.includes(+_limit)
    ) {
      return MIN_LIMIT;
    }

    return +_limit;
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }

  pagination() {
    return this;
  }

  build() {
    return {
      where: this._where,
      order: this.order,
      limit: this.limit,
      offset: this.offset,
      page: this.page,
    };
  }
}

module.exports = QueryBuilder;
