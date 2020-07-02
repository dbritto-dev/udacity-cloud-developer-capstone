import { useQuery, QueryResult } from 'react-query';
import { useToken } from 'hooks/use-token';
import { createFetchWithToken } from 'utils/unfetch';

type Todos = {
  items: Array<any>;
};

export const useTodos = (): QueryResult<Todos> => {
  const token = useToken();
  const response = useQuery(
    [`todos:all`, token],
    (_, token) => createFetchWithToken(token)<Todos>(`${process.env.REACT_APP_API_URI}/todos`),
    {
      enabled: Boolean(token),
    }
  );

  return response;
};
