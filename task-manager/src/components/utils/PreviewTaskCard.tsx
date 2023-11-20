import React from 'react';
import { useDragLayer } from 'react-dnd';

const PreviewTaskCard: React.FC = () => {
  const { isDragging, itemOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    itemOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !itemOffset) {
    return null;
  }

  const { x, y } = itemOffset;

  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <div
        className="bg-blue-200 p-4 mb-4 w-60 h-32 flex justify-center items-center rounded-md"
      >
        <p className="text-black">Drop here</p>
      </div>
    </div>
  );
};

export default PreviewTaskCard;
