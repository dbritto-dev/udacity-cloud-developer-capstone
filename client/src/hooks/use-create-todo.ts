import { useMutation, queryCache } from 'react-query';

import { CreateTodoRequest } from 'types/CreateTodoRequest';
import { TodosItem } from 'types/TodosItem';
import { useToken } from 'hooks/use-token';
import { createFetchWithToken } from 'utils/unfetch';
import { uniqid } from 'utils/uniqid';

const API_URI = process.env.REACT_APP_API_URI;

export const useCreateTodo = () => {
  const token = useToken();
  const response = useMutation<any, CreateTodoRequest, any, () => void>(
    async (data) =>
      createFetchWithToken(token)(`${API_URI}/todos`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      onMutate: (data) => {
        queryCache.cancelQueries([`todos:all`, token]);

        const rollbackData = queryCache.getQueryData<{ items: Array<any> }>([`todos:all`, token]);

        queryCache.setQueryData<{ items: Array<TodosItem> }>([`todos:all`, token], (todos) => ({
          ...todos,
          items: [
            {
              ...data,
              todoId: uniqid(),
              userId: `${uniqid()}-user`,
              done: false,
              createdAt: new Date().toISOString(),
            },
            ...(todos?.items || []),
          ] as Array<TodosItem>,
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
