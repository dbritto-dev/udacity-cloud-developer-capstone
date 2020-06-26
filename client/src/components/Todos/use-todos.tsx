import useSWR from 'swr';
import { useToken } from 'hooks/use-token';
import { createFetchWithToken } from 'utils/unfetch';

export const useTodos = () => {
  const token = useToken();
  const { data } = useSWR<{ items: Array<any> }>(
    () => (token ? `todos:all` : null),
    () =>
      createFetchWithToken(token)<{ items: Array<any> }>(`${process.env.REACT_APP_API_URI}/todos`),
    {
      suspense: true,
    }
  );

  return data;
};
