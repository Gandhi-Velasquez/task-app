type TaskCardProps = {
    id: string;
    data: {
      title: string;
      column: string;
      type: string;
      created_at: string;
      priority: number;
    }
}

type TaskInfoDialogProps = {
  id: string;
  title: string;
  column: string;
  type: string;
  created_at: string;
  priority: number;
  onClose: () => void;
}

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
  column: string;
  type: string;
  priority: number;
}

export type {
    TaskCardProps,
    TaskInfoDialogProps,
    Task,
    NewTask
}