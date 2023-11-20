import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/index';
import { fetchTasks, createTask, updateTaskColumn, selectDoneTasks, selectInProgressTasks, selectNotStartedTasks, setNotification, clearNotification } from './features/taskStore';
import CustomButton from './components/CustomButton';
import DropColumn from './components/DropColumn';
import Dialog from './components/Dialog';
import Notification from './components/utils/Notification';
import { Task, NewTask } from './types/TaskTypes';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const isTasksFetched = useSelector((state: RootState) => state.task.tasks.length > 0);

  const isMounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMounted.current && !isTasksFetched) {
          await dispatch(fetchTasks());
          console.log('Successfully Retrieved Tasks from the backend and set on Store!');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [isTasksFetched]);

  const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);

  const handleCreateTaskClick = () => {
    console.log('Dialog Opened!');
    setCreateTaskOpen(true);
  };

  const handleCloseDialog = () => {
    setCreateTaskOpen(false);
  };

  const [addingTask, setAddingTask] = useState(false)

  const notification = useSelector((state: RootState) => state.task.notification);

  const handleCreateTask = async (formData: { title: string; type: string }) => {
    setAddingTask(true)
    const newTask: NewTask = {
      title: formData.title,
      column: 'to-start',
      type: formData.type,
      priority: 3
    };

    try {
      await dispatch(createTask(newTask));
      setAddingTask(false)
      handleCloseDialog();
      dispatch(setNotification({ message: 'Task added!', type: 'success' }));
  } catch(e) {
    console.error(e)
    dispatch(setNotification({ message: 'Failed adding task', type: 'failed' }));
  }

  };

  const notStartedTasks = useSelector(selectNotStartedTasks);
  const inProgressTasks = useSelector(selectInProgressTasks);
  const doneTasks = useSelector(selectDoneTasks);

  const handleDrop = async (item: Task, column: string) => {
    if (item.data && item.data.title) {
      await dispatch(updateTaskColumn({ task_id: item.id, column }));
      dispatch(setNotification({ message: 'Task updated!', type: 'success' }));
    }
  };

  const closeNotification = () => {
    dispatch(clearNotification());
  };


  return (
    <div className="bg-app-background p-16 pb-0 m-16 w-90 flex flex-col">
      <div className="flex justify-start items-center mb-4 px-16">
        <h1 className="text-3xl ml-4 mr-8">Dashboard</h1>
        <CustomButton title="+ Create Task" onClick={handleCreateTaskClick} />
      </div>
      <div className="bg-white flex justify-between px-8">
        <DropColumn title="To Start" onDrop={(item) => handleDrop(item, 'to-start')} tasks={notStartedTasks} />
        <DropColumn title="In Progress" onDrop={(item) => handleDrop(item, 'in-progress')} tasks={inProgressTasks} />
        <DropColumn title="Done" onDrop={(item) => handleDrop(item, 'done')} tasks={doneTasks} />
      </div>
      {isCreateTaskOpen && (
        <Dialog
          title="Create Task"
          subheader="Make changes to your task here. Click save when you're done."
          onClose={handleCloseDialog}
          onSubmit={handleCreateTask}
          loading={addingTask}
        />
      )}
      {notification.open && (
        <Notification message={notification.message} type={notification.type} onClose={closeNotification} />
      )}
    </div>
  );
};

export default App;
