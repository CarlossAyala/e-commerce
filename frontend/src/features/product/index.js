import ProductAnswer from './components/product-answer';
import ProductQA from './components/product-qa';
import ProductQuestion from './components/product-question';
import ProductReview from './components/product-review';
import QAItem from './components/qa-item';

import API from './product.api';
import * as Formik from './product.formik.js';

export {
  API,
  ProductQuestion,
  ProductAnswer,
  ProductQA,
  QAItem,
  ProductReview as Review,
  Formik,
};
