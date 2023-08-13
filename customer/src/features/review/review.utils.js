import { REVIEW_RATING, REVIEW_TABS } from './review.constants';

export const findReview = (review) => {
  return REVIEW_RATING[findReviewIndex(review)];
};

export const findReviewIndex = (review) => {
  return REVIEW_RATING.indexOf(review);
};

export const validTabReview = (tab) => {
  return REVIEW_TABS.includes(tab);
};

export const findTabIndex = (tab) => {
  if (!tab || !validTabReview(tab)) return 0;

  return REVIEW_TABS.indexOf(tab);
};

export const findTab = (tab) => {
  if (!tab || !validTabReview(tab)) return 0;

  return REVIEW_TABS[findTabIndex(tab)];
};
