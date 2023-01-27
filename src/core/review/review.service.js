const { Review, Like, Dislike } = require('../../database/mysql/models');

class ReviewService {
  create({ title, comment, rating, customerId, productId }) {
    return Review.model.create({
      title,
      comment,
      rating,
      customerId,
      productId,
    });
  }

  getOne(id) {
    return Review.model.findByPk(id, {
      attributes: {
        exclude: ['customerId', 'productId'],
      },
    });
  }

  getAll(id) {
    return Review.model.findAll({
      where: {
        productId: id,
      },
      attributes: {
        exclude: ['customerId', 'productId'],
      },
    });
  }

  update(id, { title, comment, rating }) {
    return Review.model.update(
      { title, comment, rating },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return Review.model.destroy({
      where: {
        id,
      },
    });
  }

  like(id) {
    return Review.model.increment('like', {
      where: {
        id,
      },
    });
  }

  dislike(id) {
    return Review.model.increment('dislike', {
      where: {
        id,
      },
    });
  }

  registerLike(customerId, reviewId) {
    return Like.model.create({
      customerId,
      reviewId,
    });
  }

  registerDislike(customerId, reviewId) {
    return Dislike.model.create({
      customerId,
      reviewId,
    });
  }

  undoLike(id) {
    return Review.model.decrement('like', {
      where: {
        id,
      },
    });
  }

  undoDislike(id) {
    return Review.model.decrement('dislike', {
      where: {
        id,
      },
    });
  }

  removeLike(customerId, reviewId) {
    return Like.model.destroy({
      where: {
        customerId,
        reviewId,
      },
    });
  }

  removeDislike(customerId, reviewId) {
    return Dislike.model.destroy({
      where: {
        customerId,
        reviewId,
      },
    });
  }

  clearLikes(id) {
    return Like.model.destroy({
      where: {
        reviewId: id,
      },
    });
  }

  clearDislikes(id) {
    return Dislike.model.destroy({
      where: {
        reviewId: id,
      },
    });
  }

  likeExist(customerId, reviewId) {
    return Like.model.findOne({
      where: {
        customerId,
        reviewId,
      },
    });
  }

  dislikeExist(customerId, reviewId) {
    return Dislike.model.findOne({
      where: {
        customerId,
        reviewId,
      },
    });
  }
}

module.exports = ReviewService;
