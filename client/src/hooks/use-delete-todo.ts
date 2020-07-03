import { useMutation, queryCache } from 'react-query';

import { useToken } from 'hooks/use-token';
import { createFetchWithToken } from 'utils/unfetch';

const API_URI = process.env.REACT_APP_API_URI;

export const useDeleteTodo = (id: string) => {
  const token = useToken();
  const response = useMutation<any, undefined, any, () => void>(
    async () =>
      createFetchWithToken(token)(`${API_URI}/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      onMutate: () => {
        queryCache.cancelQueries([`todos:all`, token]);

        const rollbackDate = queryCache.getQueryData<{ items: Array<any> }>([`todos:all`, token]);

        queryCache.setQueryData<{ items: Array<any> }>([`todos:all`, token], (todos) => ({
          ...todos,
          items: todos?.items.filter((todo) => todo.todoId !== id) as Array<any>,
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
