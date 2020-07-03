export type TodosItem = {
  todoId: string;
  userId: string;
  name: string;
  createdAt: string;
  dueDate: string;
  attachment?: string;
  done: boolean;
};
