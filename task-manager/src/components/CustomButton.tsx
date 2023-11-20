
import React from 'react';
import { CustomButtonProps } from '../types/CommonTypes';

const getSizeClass = (size: CustomButtonProps['size']) => {
  const sizeClass = {
    small: 'py-1 px-2 text-xs',
    normal: 'py-2 px-4',
    large: 'py-4 px-6 text-lg',
    xl: 'py-6 px-8 text-xl',
  };
  return sizeClass[size || 'normal'];
};

const getTypeClass = (type: CustomButtonProps['type']) => {
  const typeClass = {
    warning: 'text-white bg-red-900 hover:bg-red-700',
    default: 'text-white bg-slate-900 hover:bg-slate-700',
    notification: 'bg-emerald-400 text-slate-900 border'
  };
  return typeClass[type || 'default'];
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  onClick,
  size = 'normal',
  disabled,
  type = 'default',
  loading = false,
}) => {
  const buttonSizeClass = getSizeClass(size);
  const buttonTypeClass = getTypeClass(type);
  const loadingSpinnerSizeClass = 'w-5 h-5';

  return (
    <button
      className={`mr-2 rounded-md text-white ${buttonSizeClass} ${buttonTypeClass}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center space-x-4">
          <div className={loadingSpinnerSizeClass + ' border-t-2 border-slate-100 border-solid rounded-full animate-spin'}></div>
        </div>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </>
      )}
    </button>
  );
};

export default CustomButton;
