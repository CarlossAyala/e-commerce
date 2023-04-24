import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductQA, Rating, Review } from '../features/product';
import { API } from '../features/product';
import { useAuth } from '../features/auth';
import { useAddHistory } from '../features/history';
// TODO: Refactor this shit
import ProductName from '../features/product/components/product/product-name';
import ProductImage from '../features/product/components/product/product-image';
import ProductPrice from '../features/product/components/product/product-price';
import ProductDescription from '../features/product/components/product/product-description';
import ProductDetails from '../features/product/components/product/product-details';
import ProductAddCart from '../features/product/components/product/product-add-cart';
import ProductStore from '../features/product/components/product/product-store';

const Product = () => {
  const [data, setData] = useState(null);

  const { id } = useParams();

  const [jwt, user] = useAuth();

  const getAllInfo = async () => {
    try {
      const allInfo = await Promise.allSettled([
        API.getOne(id),
        API.getInfoStore(id),
        API.getQAs(id),
      ]);

      console.log(allInfo);

      setData(allInfo);
    } catch (error) {
      console.log('Product', error);
    }
  };

  const addHistory = useAddHistory();

  useEffect(() => {
    getAllInfo();
  }, [id]);

  useEffect(() => {
    if (jwt && user && id) addHistory.mutate(id);
  }, [id]);

  if (!data) return <p>No data yet</p>;

  const [{ value: product }, { value: store }, { value: QAs }] = data;

  // Zoom imagen https://www.upbeatcode.com/react/how-to-implement-zoom-image-in-react/

  return (
    <section className='mx-auto w-full max-w-7xl'>
      <div className=''>
        <div className='my-2 px-4'>
          <ProductName text={product.name} />
        </div>
        <div>
          <ProductImage />
        </div>
        <div className='px-4 py-3'>
          <ProductPrice price={product.price} />
        </div>
        <div className='px-4 pb-3'>
          <ProductDescription description={product.description} />
        </div>
        {/* Details */}
        <div className='px-4 pb-3'>
          <ProductDetails product={product} />
        </div>
        {/* Unit Controller */}
        <div className='px-4 pb-4'>
          <ProductAddCart product={product} />
        </div>
        {/* Información de la Tienda */}
        <div className='border-y border-gray-200 p-4'>
          <h3 className='mb-2 font-medium uppercase'>Store Information</h3>
          <ProductStore store={store} />
        </div>
        {/* Preguntas y Respuestas */}
        <div className='border-b border-gray-200 p-4'>
          <h3 className='mb-2 font-medium uppercase'>Questions and Answers</h3>
          <ProductQA QAs={QAs} />
        </div>
        {/* Score */}
        <div className='border-b border-gray-200 p-4'>
          <h3 className='mb-3 font-medium uppercase'>Product Score</h3>
          <Rating />
        </div>
        {/* Reviews */}
        <div className='mt-4 border-b border-gray-200 px-4'>
          <h3 className='font-medium uppercase'>Product reviews</h3>
          <div className='divide-y divide-gray-200'>
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
          </div>
        </div>
        {/* Productos Relacionados */}
        <div className='border-gray-200 p-4'>
          <h3 className='mb-3 font-medium uppercase'>Related products</h3>
        </div>
      </div>
    </section>
  );
};

export default Product;
