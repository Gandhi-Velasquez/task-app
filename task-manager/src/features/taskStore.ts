import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';
import { RootState } from '../store';
import { createSelector } from 'reselect'
import {
  TaskState,
  NewTask,
  Task
} from '../types/TaskStoreTypes'

const initialState: TaskState = {
  tasks: [],
  notStartedTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  notification: {
    open: false,
    message: '',
    type: ''
  },
};

export const fetchTasks = createAsyncThunk('task/fetchTasks', async (_, { dispatch }) => {
  try {
    const response = await api.get('/tasks');
    dispatch(setTasks(response.data.tasks));
    return response.data.tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
});

export const createTask = createAsyncThunk('task/createTask', async (new_task: NewTask, { dispatch }) => {
  try {
    const response = await api.post('/task', new_task);
    dispatch(setNewTask(response.data));
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
});

export const updateTask = createAsyncThunk('task/updateTask', async (task: Task, { dispatch }) => {
  try {
    const response = await api.put(`/task/${task.id}`, task.data);
    if (response.data.id) {
        dispatch(updateExistingTask({ id: response.data.id, data: task.data }));
    }
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
});

export const deleteTask = createAsyncThunk('task/deleteTask', async (task_id: string, { dispatch }) => {
  try {
    const response = await api.delete(`/task/${task_id}`);
    dispatch(deleteExistingTask(response.data.id));
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
});

export const updateTaskColumn = createAsyncThunk(
  'task/updateTaskColumn',
  async ({ task_id, column }: { task_id: string; column: string }, { dispatch, getState }) => {
    try {
      const state: { task: TaskState } = getState() as RootState;
      const task = state.task.tasks.find((task) => task.id === task_id);
      if (task && task.data.column !== column) {        
          const response = await api.put(`/task/${task_id}`, { column });
          dispatch(updateExistingTask({ id: response.data.id, data: { column } }));
          return response.data;
      }
    } catch (error) {
      console.error('Error updating task column:', error);
      throw error;
    }
  }
);
  

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setNewTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateExistingTask: (state, action: PayloadAction<{ id: string; data: Partial<Task['data']> }>) => {
      const { id, data } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
    
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          data: {
            ...state.tasks[index].data,
            ...data, 
          },
        };
      }
    },
    deleteExistingTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setNotification: (state, action: PayloadAction<{ message: string; type: string }>) => {
      state.notification.open = true
      state.notification.message = action.payload.message;
      state.notification.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.notification = { open: false, message: '', type: '' }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

const selectTasks = (state: RootState) => state.task.tasks;

export const selectNotStartedTasks = createSelector(
  [selectTasks],
  (tasks) => {
    const notStartedTasks = tasks.filter((task: Task) => task.data.column === 'to-start');
    return notStartedTasks;
  }
);

export const selectInProgressTasks = createSelector(
  [selectTasks],
  (tasks) => {
    const inProgressTasks = tasks.filter((task: Task) => task.data.column === 'in-progress');
    return inProgressTasks;
  }
);
  
export const selectDoneTasks = createSelector(
  [selectTasks],
  (tasks) => {
    const doneTasks = tasks.filter((task: Task) => task.data.column === 'done');
    return doneTasks;
  }
);

export const { setTasks, setNewTask, updateExistingTask, deleteExistingTask, setNotification, clearNotification } = taskSlice.actions;

export default taskSlice.reducer;
