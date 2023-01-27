const ReviewService = require('./review.service');

const ReviewProvider = new ReviewService();

const getOne = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resoure = await ReviewProvider.getOne(resourceId);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resources = await ReviewProvider.getAll(resourceId);

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const customerId = req.auth.id;
    const productId = req.params.id;
    const body = req.body;

    await ReviewProvider.create({
      ...body,
      customerId,
      productId,
    });

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    /*
      Delete
      - Likes
      - Dislikes
      - Review
    */

    const reviewId = req.params.id;

    await ReviewProvider.clearLikes(reviewId);
    await ReviewProvider.clearDislikes(reviewId);
    await ReviewProvider.remove(reviewId);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const body = req.body;

    await ReviewProvider.update(resourceId, body);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

// TODO: Like/Dislike tendrían que ser envueltos en una Transacción?

const like = async (req, res, next) => {
  try {
    const customerId = req.auth.id;
    const reviewId = req.params.id;

    // If the customer disliked the Review,
    // then remove it and give it a like
    const disliked = await ReviewProvider.dislikeExist(customerId, reviewId);

    // If like review already exists, undoLike
    // else like review increment
    const like = await ReviewProvider.likeExist(customerId, reviewId);

    if (disliked) {
      await ReviewProvider.removeDislike(customerId, reviewId);
      await ReviewProvider.undoDislike(reviewId);
      await ReviewProvider.like(reviewId);
      await ReviewProvider.registerLike(customerId, reviewId);
    } else if (like) {
      await ReviewProvider.removeLike(customerId, reviewId);
      await ReviewProvider.undoLike(reviewId);
    } else {
      await ReviewProvider.like(reviewId);
      await ReviewProvider.registerLike(customerId, reviewId);
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const dislike = async (req, res, next) => {
  try {
    const customerId = req.auth.id;
    const reviewId = req.params.id;

    // If the customer liked the Review,
    // then remove it and give it a dislike
    const liked = await ReviewProvider.likeExist(customerId, reviewId);

    // If dislike review already exists, undoDislike
    // else dislike review increment
    const dislike = await ReviewProvider.dislikeExist(customerId, reviewId);

    if (liked) {
      await ReviewProvider.undoLike(reviewId);
      await ReviewProvider.removeLike(customerId, reviewId);
      await ReviewProvider.dislike(reviewId);
      await ReviewProvider.registerDislike(customerId, reviewId);
    } else if (dislike) {
      await ReviewProvider.undoDislike(reviewId);
      await ReviewProvider.removeDislike(customerId, reviewId);
    } else {
      await ReviewProvider.registerDislike(customerId, reviewId);
      await ReviewProvider.dislike(reviewId);
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  remove,
  like,
  dislike,
};
