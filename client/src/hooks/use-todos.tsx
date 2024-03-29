import { useQuery, QueryResult } from 'react-query';

import { Todos } from 'types/Todos';
import { useToken } from 'hooks/use-token';
import { createFetchWithToken } from 'utils/unfetch';

const API_URI = process.env.REACT_APP_API_URI;

export const useTodos = (): QueryResult<Todos> => {
  const token = useToken();
  const response = useQuery(
    [`todos:all`, token],
    (_, token) =>
      createFetchWithToken(token)<Todos>(`${API_URI}/todos`, {
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      enabled: Boolean(token),
    }
  );

  return response;
};
