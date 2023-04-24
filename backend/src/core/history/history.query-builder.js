const QueryBuilder = require('../../utils/database/query-builder');

class HistoryQueryBuilder extends QueryBuilder {
  constructor(query) {
    super(query);
  }
}

module.exports = HistoryQueryBuilder;
