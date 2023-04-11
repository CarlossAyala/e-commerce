import {
  HomeIcon,
  ShoppingBagIcon,
  BookmarkIcon,
  ClockIcon,
  ListBulletIcon,
  TrophyIcon,
  CheckBadgeIcon,
  PlusIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
  [
    { name: 'Inicio', to: '/', icon: HomeIcon },
    { name: 'Mis compras', to: '/purchases/list', icon: ShoppingBagIcon },
    { name: 'Favoritos', to: '/bookmarks/list', icon: BookmarkIcon },
    { name: 'Historial', to: '/history', icon: ClockIcon },
    { name: 'Settings', to: '/settings', icon: Cog6ToothIcon },
  ],
  [
    { name: 'Categorias', to: '/categories', icon: ListBulletIcon },
    { name: 'Más vendidos', to: '/best-sellers', icon: TrophyIcon },
    {
      name: 'Tiendas oficiales',
      to: '/official-stores',
      icon: CheckBadgeIcon,
    },
  ],
  [
    { name: 'Sign in', to: '/signin', icon: ChevronRightIcon },
    { name: 'Create account', to: '/signup', icon: PlusIcon },
  ],
];
const MobileSlider = ({ onClick }) => {
  return (
    <div className='px-4'>
      {navigation.map((section, index) => (
        <ul key={index} className='flow-root border-b border-gray-200 py-2'>
          {section.map(({ name, to, icon: Icon }, index) => (
            <li className='flex items-center' onClick={onClick} key={index}>
              <Icon className='h-6 w-6' />
              <Link to={to} className='block p-2 text-gray-900'>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default MobileSlider;
