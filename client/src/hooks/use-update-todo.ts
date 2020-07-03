import { useMutation, queryCache } from 'react-query';

import { UpdateTodoRequest } from 'types/UpdateTodoRequest';
import { TodosItem } from 'types/TodosItem';
import { useToken } from 'hooks/use-token';
import { createFetchWithToken } from 'utils/unfetch';

const API_URI = process.env.REACT_APP_API_URI;

export const useUpdateTodo = (todoId: string) => {
  const token = useToken();
  const response = useMutation<any, UpdateTodoRequest, any, () => void>(
    async (data) =>
      createFetchWithToken(token)(`${API_URI}/todos/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      onMutate: (data) => {
        queryCache.cancelQueries([`todos:all`, token]);

        const rollbackData = queryCache.getQueryData<{ items: Array<TodosItem> }>([
          `todos:all`,
          token,
        ]);

        queryCache.setQueryData<{ items: Array<TodosItem> }>([`todos:all`, token], (todos) => ({
          ...todos,
          items: todos?.items.map((todo) =>
            todo.todoId === todoId ? { ...todo, ...data } : todo
          ) as Array<TodosItem>,
        }));

        return () => queryCache.setQueryData([`todos:all`, token], rollbackData);
      },
      onSuccess: () => queryCache.invalidateQueries([`todos:all`, token]),
      onError: (_error, _data, rollback) => rollback(),
      onSettled: () => queryCache.invalidateQueries([`todos:all`, token]),
    }
  );

  return response;
};
