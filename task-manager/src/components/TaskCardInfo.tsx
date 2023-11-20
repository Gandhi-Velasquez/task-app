import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, setNotification } from '../features/taskStore';
import { AppDispatch } from '../store/index';
import { TaskInfoDialogProps, Task } from '../types/TaskTypes';

const TaskCardInfo: React.FC<TaskInfoDialogProps> = ({
  id,
  title,
  column,
  type,
  created_at,
  priority,
  onClose,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedType, setUpdatedType] = useState(type); 
  const [updatedPriority, setUpdatedPriority] = useState(priority); 
  const [updatedStatus, setUpdatedStatus] = useState(column);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const types = ['DevOps', 'Front-End', 'Back-End', 'Design'];

  const prioritiesOptions = [
    { id: 3, text: 'Not Urgent' },
    { id: 2, text: 'Needed' },
    { id: 1, text: 'Urgent' }
  ]
  
  const statusOptions = [
    { id: 'to-start', text: 'To Start' },
    { id: 'in-progress', text: 'In Progress' },
    { id: 'done', text: 'Done' }
  ]
  
  const getDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

 
  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);

      const updatedTask: Task = {
        id,
        data: {
          title: updatedTitle,
          type: updatedType,
          priority: updatedPriority,
          column: updatedStatus,
          created_at,
        },
      };
      
      if (!updatedTask.id) {
        dispatch(setNotification({ message: 'Erro Updating Task.', type: 'failed' }))
        setUpdateLoading(false);
        return
      }
      await dispatch(updateTask(updatedTask));

      setUpdateLoading(false);
      onClose()

      dispatch(setNotification({ message: 'Task updated!', type: 'success' }))
  
    } catch (e) {
      console.error('Error updating task:', e);
      dispatch(setNotification({ message: 'Task deleted!', type: 'failed' }))
    }
  };
  

  const onDelete = async (id: string) => {
    try {
      console.log(`Deleting Task ${id}`)
      setDeleteLoading(true);

      await dispatch(deleteTask(id));
      
      setDeleteLoading(true);
      onClose()
      dispatch(setNotification({ message: 'Task deleted!', type: 'success' }))
    } catch(e) {
      console.error('Error deleting task:', e)
      dispatch(setNotification({ message: 'Task deleted!', type: 'failed' }))
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg border shadow-md w-96">
        <div className="flex justify-between items-center text-lg font-semibold mb-2 pt-2">
          <input
            type="text"
            placeholder="Task name"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="mt-1 mr-2 p-2 w-full border focus:outline-none focus:border-slate-900 rounded-md"
            required
          />
          <div>
            <CustomButton title="Delete" onClick={() => onDelete(id)} size={'small'} type={'warning'} loading={deleteLoading}/>
          </div>
        </div>
        <div className="mb-8 ml-1 flex items-center">
          <p className="text-sm">Created on: {getDate(created_at)}</p>
        </div>
        <div className="mb-4 flex ml-8 items-center">
          <label className="block text-sm font-medium text-gray-700 mr-12">Type</label>
          <div className="mt-1 grid grid-cols-2 gap-4">
            {types.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                    {updatedType === type && (
                      <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                    )}
                  </div>
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={updatedType === type}
                    onChange={(e) => setUpdatedType(e.target.value)}
                    className="absolute -inset-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-sm">{type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 flex ml-8 items-center">
          <label className="block text-sm font-medium text-gray-700 mr-8">Priority</label>
          <select
            value={updatedPriority}
            onChange={(e) => setUpdatedPriority(Number(e.target.value))}
            className="mt-1 mr-2 p-2 w-full border focus:outline-none focus:border-slate-900 rounded-md"
          >
            {prioritiesOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex ml-8 items-center">
          <label className="block text-sm font-medium text-gray-700 mr-8">Status</label>
          <select
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
            className="mt-1 ml-1 mr-2 p-2 w-full border focus:outline-none focus:border-slate-900 rounded-md"
          >
            {statusOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end pt-4">
          <CustomButton title="Close" onClick={onClose} />
          <CustomButton title="Save" onClick={handleUpdate} loading={updateLoading}/>
        </div>
      </div>
    </div>
  );
};

export default TaskCardInfo;
