const ButtonIcon = ({ label, onClick, icon: Icon }) => {
  return (
    <button
      type='button'
      className='inline-block p-2 text-gray-400 hover:text-gray-500'
      onClick={onClick}
    >
      <span className='sr-only'>{label}</span>
      <Icon className='h-6 w-6' aria-hidden='true' />
    </button>
  );
};

export default ButtonIcon;
