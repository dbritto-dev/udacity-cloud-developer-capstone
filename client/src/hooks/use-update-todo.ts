import { useMutation, queryCache } from 'react-query';

import { useToken } from 'hooks/use-token';
import { createFetchWithToken } from 'utils/unfetch';

interface UpdateTodoRequest {
  name: string;
  dueDate: string;
  done: boolean;
}

const API_URI = process.env.REACT_APP_API_URI;

export const useUpdateTodo = (id: string) => {
  const token = useToken();
  const response = useMutation<any, UpdateTodoRequest, any, () => void>(
    async (data) =>
      createFetchWithToken(token)(`${API_URI}/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      onMutate: (data) => {
        queryCache.cancelQueries([`todos:all`, token]);

        const rollbackDate = queryCache.getQueryData<{ items: Array<any> }>([`todos:all`, token]);

        queryCache.setQueryData<{ items: Array<any> }>([`todos:all`, token], (todos) => ({
          ...todos,
          items: todos?.items.map((todo) =>
            todo.todoId === id ? { ...todo, ...data } : todo
          ) as Array<any>,
        }));

        return () => queryCache.setQueryData([`todos:all`, token], rollbackDate);
      },
      onSuccess: () => queryCache.invalidateQueries([`todos:all`, token]),
      onError: (_error, _data, rollback) => rollback(),
      onSettled: () => queryCache.invalidateQueries([`todos:all`, token]),
    }
  );

  return response;
};
