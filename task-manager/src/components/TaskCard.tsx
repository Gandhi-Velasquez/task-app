import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import Label from './Label';
import TaskCardInfo from './TaskCardInfo';
import { TaskCardProps } from '../types/TaskTypes';

const TaskCard: React.FC<TaskCardProps> = ({ id, data}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASKCARD',
    item: { id, data },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const getDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        ref={drag}
        className={`p-4 mb-4 border rounded-lg shadow-md ${isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'}`}
        onClick={() => setModalOpen(true)}
      >
        <Label priority={data.priority} type={data.type} />
        <p className="mb-1">{data.title}</p>
        <p>{getDate(data.created_at)}</p>
      </div>

      {isModalOpen && (
        <TaskCardInfo
          id={id}
          title={data.title}
          column={data.column}
          type={data.type}
          created_at={data.created_at}
          priority={data.priority}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
