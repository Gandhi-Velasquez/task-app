import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchTasks,
  createTask,
} from '../features/taskStore';
import { api } from '../utils/api';

jest.mock('../utils/api');

const mockStore = configureMockStore([thunk]);

describe('Redux Store', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      task: {
        tasks: [],
        notStartedTasks: [],
        inProgressTasks: [],
        completedTasks: [],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should dispatch fetchTasks', async () => {
    const mockedTasks = [
      {
        id: '1',
        data: {
          title: 'New Mock Task',
          column: 'to-start',
          type: 'Type 1',
          created_at: '2023-01-01T00:00:00.000Z',
          priority: 1,
        },
      },
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: { tasks: mockedTasks } });

    await store.dispatch(fetchTasks());

    const expectedActions = [
      { type: 'task/fetchTasks/pending', meta: { arg: undefined, requestId: expect.any(String), requestStatus: 'pending' } },
      { type: 'task/setTasks', payload: mockedTasks },
      { type: 'task/fetchTasks/fulfilled', meta: { arg: undefined, requestId: expect.any(String), requestStatus: 'fulfilled' }, payload: mockedTasks },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('should dispatch createTask', async () => {
    const newTask = {
      title: 'Mock task',
      column: 'to-start',
      type: 'Type',
      priority: 3,
    };

    (api.post as jest.Mock).mockResolvedValue({ data: newTask });

    await store.dispatch(createTask(newTask));

    const expectedActions = [
      { type: 'task/createTask/pending', meta: { arg: newTask, requestId: expect.any(String), requestStatus: 'pending' } },
      { type: 'task/setNewTask', payload: newTask },
      { type: 'task/createTask/fulfilled', meta: { arg: newTask, requestId: expect.any(String), requestStatus: 'fulfilled' }, payload: newTask },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
