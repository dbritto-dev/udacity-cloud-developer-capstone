import { useQuery, QueryResult } from 'react-query';
import { useToken } from 'hooks/use-token';
import { createFetchWithToken } from 'utils/unfetch';
import { TodosItem } from 'types/TodosItem';

const API_URI = process.env.REACT_APP_API_URI;

export const useTodo = (id: string): QueryResult<TodosItem> => {
  const token = useToken();
  const response = useQuery(
    [`todos:${id}`, token],
    (_, token) =>
      createFetchWithToken(token)<TodosItem>(`${API_URI}/todos/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      enabled: Boolean(token),
    }
  );

  return response;
};
