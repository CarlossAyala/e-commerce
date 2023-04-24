const HistoryService = require('./history.service');
const HistoryQueryBuilder = require('./history.query-builder');

const HistoryProvider = new HistoryService();

const getAll = async (req, res, next) => {
  try {
    // TODO: Add pagination
    const customerId = req.auth.id;

    const historyClauses = new HistoryQueryBuilder(req.query)
      .where('customerId', customerId)
      .orderBy('lastSeenAt', 'DESC')
      .withPagination()
      .build();

    // console.log('historyClauses', historyClauses);

    const resources = await HistoryProvider.getAll(historyClauses, customerId);

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const customerId = req.auth.id;
  const productId = req.params.id;

  try {
    let [history, created] = await HistoryProvider.findOrCreate(
      customerId,
      productId
    );

    // console.log(customerId, productId);

    // Update last seen
    if (!created) {
      await HistoryProvider.updateLastSeen(customerId, productId);
      history = await HistoryProvider.getOne(customerId, productId);
    }

    res.status(201).json(history);
  } catch (error) {
    next(error);
  }
};

const removeAll = async (req, res, next) => {
  try {
    await HistoryProvider.removeAll(req.auth.id);

    res.status(200).json({
      message: 'Clear successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const customerId = req.auth.id;
  const productId = req.params.id;

  try {
    await HistoryProvider.remove(customerId, productId);

    res.status(200).json({
      message: 'Removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  remove,
  removeAll,
};
