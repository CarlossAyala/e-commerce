import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/outline';
import { useAddBookmark, useRemoveBookmark } from '../../bookmarks';
import clsx from 'clsx';

const ItemBookmark = ({ item }) => {
  const addBookmart = useAddBookmark();
  const removeBookmark = useRemoveBookmark();

  const handleBookmark = () => {
    if (item.product.inBookmark) {
      removeBookmark.mutate(item.product.id);
    } else {
      addBookmart.mutate(item.product.id);
    }
  };

  return (
    <button
      type='button'
      className={clsx(
        item.product.inBookmark ? 'bg-indigo-500' : 'bg-white',
        'rounded border border-gray-200 p-2 font-medium'
      )}
      onClick={handleBookmark}
    >
      {item.product.inBookmark ? (
        <BookmarkSlashIcon className='h-5 w-5 text-white ' />
      ) : (
        <BookmarkIcon className='h-5 w-5 text-indigo-500' />
      )}
    </button>
  );
};

export default ItemBookmark;
