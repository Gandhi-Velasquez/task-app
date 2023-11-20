import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import TaskCard from './TaskCard';
import PreviewTaskCard from './utils/PreviewTaskCard';
import { ColumnProps } from '../types/DropColumnTypes';
import { Task } from '../types/TaskTypes';

const DropColumn: React.FC<ColumnProps> = ({ title, onDrop, tasks }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'TASKCARD',
        drop: (item: { id: string; data: {title: string; type: string; created_at: string; priority: number; column: string }}) => onDrop(item),
        collect: (monitor: DropTargetMonitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      });

  return (
    <div ref={drop} className="w-1/3 p-4 mx-8">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-[60vh] overflow-y-auto">
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} id={task.id} data={task.data}/>
        ))}
      </div>
      {isOver && canDrop && <PreviewTaskCard />}
    </div>
  );
};

export default DropColumn;
