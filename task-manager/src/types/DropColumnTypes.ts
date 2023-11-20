type Task = {
  id: string;
  data: {
    title: string;
    type: string;
    created_at: string;
    priority: number;
    column: string;
  };
};

type ColumnProps = {
  title: string;
  onDrop: (item: Task) => void;
  tasks: Task[];
};

export type {
    ColumnProps
}