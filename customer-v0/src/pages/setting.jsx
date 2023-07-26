import { SettingCard } from '../features/setting';

const navigations = [
  {
    label: 'Mi cuenta',
    to: 'account',
    description: 'Gestioná tus datos.',
  },
  {
    label: 'Direcciones',
    to: 'address',
    description: 'Gestioná tus direcciones',
  },
  {
    label: 'Tarjetas',
    to: 'card',
    description: 'Gestioná tus tarjetas',
  },
  {
    label: 'Contraseña',
    to: 'change-password',
    description: 'Cambiar contraseña',
  },
];

const Setting = () => {
  return (
    <main className='mx-auto w-full max-w-7xl p-4'>
      <div className='mx-auto max-w-md'>
        <h3 className='text-lg font-medium text-gray-900'>Settings</h3>
        <ul className='mt-2 space-y-3'>
          {navigations.map((nav) => (
            <SettingCard setting={nav} key={nav.to} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Setting;
