type Task = {
    id: string;
    data: {
        title: string;
        column: string;
        type: string;
        created_at: string;
        priority: number;
    }
};

type NewTask = {
    title: string;
}

type TaskState = {
  tasks: Task[];
  notStartedTasks: Task[];
  inProgressTasks: Task[];
  completedTasks: Task[];
  notification: {
    open: boolean;
    message: string;
    type: string;
  };
}

export type {
    TaskState,
    NewTask,
    Task
}