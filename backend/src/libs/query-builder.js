const { Op } = require('sequelize');

class QueryBuilder {
  constructor(query) {
    this.filters = {};
    this._where = {};
    this.order = [];
    this._limit = null;
    this._offset = null;
    this.params = query;
  }

  getSortDirection(dir) {
    return dir === 'ASC' ? 'ASC' : 'DESC';
  }
  getBooleanValue(bool) {
    return bool === 'true';
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

  whereGT(fieldName, value = 0) {
    if (+value) {
      this._where[fieldName] = { [Op.gt]: +value };
    }
    return this;
  }

  whereGTE(fieldName, value = 0) {
    if (+value) {
      this._where[fieldName] = { [Op.gte]: +value };
    }
    return this;
  }

  whereLT(fieldName, value = 0) {
    if (+value) {
      this._where[fieldName] = { [Op.lt]: +value };
    }
    return this;
  }

  whereLTE(fieldName, value = 0) {
    if (+value) {
      this._where[fieldName] = { [Op.lte]: +value };
    }
    return this;
  }

  whereLike(fieldName, value = '') {
    if (value) {
      this._where[fieldName] = { [Op.substring]: value };
    }
    return this;
  }

  whereNot(fieldName, value = '') {
    if (value) {
      this._where[fieldName] = { [Op.not]: value };
    }
    return this;
  }

  whereBetween(fieldName, [from = 0, to = 0]) {
    const fromValue = +from;
    const toValue = +to;

    if (fromValue && toValue) {
      this._where[fieldName] = { [Op.between]: [fromValue, toValue] };
    } else if (fromValue) {
      this._where[fieldName] = { [Op.gte]: fromValue };
    } else if (toValue) {
      this._where[fieldName] = { [Op.lte]: toValue };
    }
    return this;
  }

  whereBoolean(fieldName, value) {
    const bool = this.getBooleanValue(value);

    this._where[fieldName] = bool;

    return this;
  }

  orderBy(fieldName, direction = 'ASC') {
    if (fieldName) {
      this.order.push([fieldName, this.getSortDirection(direction)]);
    }
    return this;
  }

  limit(item = 10) {
    const MIN_LIMIT = 10;
    let item_peer_page = +item;

    if (item_peer_page < MIN_LIMIT || !Number.isInteger(item_peer_page)) {
      item_peer_page = MIN_LIMIT;
    }

    this._limit = item_peer_page;
  }

  offset(page = 1) {
    const MIN_OFFSET = 1;
    let offset = +page;

    if (offset < MIN_OFFSET || !Number.isInteger(offset)) {
      offset = MIN_OFFSET;
    }

    this._offset = (offset - 1) * this._limit;
  }

  pagination() {
    const { limit, page } = this.params;

    this.limit(limit);
    this.offset(page);

    return this;
  }

  build() {
    return {
      where: this._where,
      order: this.order,
      limit: this._limit,
      offset: this._offset,
    };
  }
}

module.exports = QueryBuilder;
