import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductQA } from '../features/product';
import { Formater } from '../features/utils/helpers';
import { useImageOnLoad } from '../features/utils/hooks';
import * as Prod from '../features/product';

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(null);

  const { id } = useParams();
  const [onLoad, styles] = useImageOnLoad();

  const getAllInfo = async () => {
    try {
      const allInfo = await Promise.allSettled([
        Prod.API.getOne(id),
        Prod.API.getInfoStore(id),
        Prod.API.getQAs(id),
      ]);

      console.log(allInfo);

      setData(allInfo);
    } catch (error) {
      console.log('Product', error);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  if (!data) return <p>No data yet</p>;

  const [{ value: product }, { value: brand }, { value: QAs }] = data;

  return (
    <section className='mx-auto w-full max-w-7xl'>
      <div className='space-y-6'>
        {/* Name */}
        <h1 className='px-4 text-lg font-medium'>{product.name}</h1>
        {/* Image */}
        <div className='relative mx-auto mt-2 h-40 overflow-hidden rounded-t-md px-4'>
          <img
            src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
            onLoad={onLoad}
            style={styles.thumbnail}
            className='h-full w-full object-cover object-center'
          />
          <img
            src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
            onLoad={onLoad}
            style={styles.fullSize}
            className='h-full w-full object-cover object-center'
          />
        </div>
        {/* Price */}
        <p className='px-4 text-3xl tracking-tight text-gray-900'>
          {Formater.price(product.price)}
        </p>
        <div className='px-4'>
          <h3 className='font-medium uppercase'>Description</h3>
          <p className='text-gray-900'>{product.description}</p>
        </div>
        {/* More info */}
        <ul className='px-4'>
          <li className='text-slate-900'>
            Stock: <span className='text-indigo-600'>{product.stock}</span>
          </li>
          <li className='text-slate-900'>
            Sold: <span className='text-indigo-600'>{product.sold}</span>
          </li>
          <li className='text-slate-900'>
            Condition:{' '}
            <span className='capitalize text-indigo-600'>
              {product.condition}
            </span>
          </li>
        </ul>
        {/* Unit Controller */}
        <div className='grid grid-cols-2 gap-5 px-4'>
          <div className='flex-2 flex h-10 items-center rounded-md border border-gray-200'>
            <button
              type='button'
              className='h-10 rounded-l-md bg-slate-200 p-2 text-indigo-600 disabled:cursor-not-allowed disabled:text-gray-600 disabled:opacity-50'
              onClick={() => setQuantity((curr) => --curr)}
              disabled={quantity === 1}
            >
              <MinusIcon className='h-5 w-5' />
            </button>
            <div className='w-full px-4 text-center text-xl'>
              <span>{quantity}</span>
            </div>
            <button
              type='button'
              className='h-10 rounded-r-md bg-slate-200 p-2 text-indigo-600 disabled:cursor-not-allowed disabled:text-gray-600 disabled:opacity-50'
              onClick={() => setQuantity((curr) => ++curr)}
              disabled={quantity === product.stock}
            >
              <PlusIcon className='h-5 w-5' />
            </button>
          </div>
          <button
            className='block h-10 rounded-md bg-indigo-600 p-2 text-white'
            type='button'
          >
            Add to cart
          </button>
        </div>
        {/* Información de la Tienda */}
        <div className='px-4'>
          <h3 className='mb-1 font-medium uppercase'>Store Information</h3>
          <Link to={`/store/${brand.id}`} className='flex items-start'>
            <div className='h-14 w-14 overflow-hidden rounded-md'>
              <img
                className='h-full w-full object-cover object-center'
                src={brand.profile}
                alt={`Profile of ${brand.name} store`}
              />
            </div>
            <div className='px-2'>
              <h3 className=''>{brand.name}</h3>
              {brand.official && (
                <p className='text-sm text-gray-500'>
                  Official Fak-Ommerce store
                </p>
              )}
            </div>
          </Link>
        </div>
        {/* Preguntas y Respuestas */}
        <div className='px-4'>
          <h3 className='mb-1 font-medium uppercase'>Questions and Answers</h3>
          <ProductQA QAs={QAs} />
        </div>
        {/* Reviews */}
        <div className=''>
          <h3 className='px-4 font-medium uppercase'>Product reviews</h3>
          <Prod.Review />
        </div>
        {/* Productos Relacionados */}
      </div>
    </section>
  );
};

export default Product;
