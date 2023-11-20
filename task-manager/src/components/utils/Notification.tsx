import React, { useEffect } from 'react';
import CustomButton from '../CustomButton';

type NotificationProps = {
  message: string;
  type: string;
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  const textClass = type === 'success' ? 'text-emerald-400' : 'text-red-400';

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg border shadow-md w-96">
        <div className='flex justify-between items-center'>
            <p className={`mr-8 text-lg ${textClass}`}>{message}</p>
            <CustomButton title="Close" onClick={onClose} type={"notification"}/>
        </div>
    </div>
  );
};

export default Notification;
