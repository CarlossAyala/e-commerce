import { Link } from 'react-router-dom';
import clsx from 'clsx';

const Logo = ({ className }) => {
  return (
    <Link
      to='/'
      className={clsx(
        'bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent text-slate-900',
        className
      )}
    >
      Fak-Ommerce
    </Link>
  );
};

export default Logo;
