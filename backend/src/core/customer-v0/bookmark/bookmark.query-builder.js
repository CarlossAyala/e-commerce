const QueryBuilder = require('../../utils/database/query-builder');

class BookmarkQueryBuilder extends QueryBuilder {
  constructor(query) {
    super(query);
  }
}

module.exports = BookmarkQueryBuilder;
