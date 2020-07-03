import unfetch from 'unfetch';

export const fetch = async <T>(input: RequestInfo, options?: RequestInit): Promise<T> =>
  new Promise((resolve, reject) =>
    unfetch(input, options).then((r) => {
      if (r.ok) {
        try {
          resolve(r.json());
        } catch (e) {
          resolve();
        }
      } else {
        reject(r);
      }
    })
  );

export const createFetchWithToken = (token?: string) => <T>(
  input: RequestInfo,
  options?: RequestInit
) =>
  token
    ? fetch<T>(
        input,
        options
          ? {
              ...options,
              headers: {
                ...(options?.headers || {}),
                Authorization: `Bearer ${token}`,
              },
            }
          : { headers: { Authorization: `Bearer ${token}` } }
      )
    : fetch<T>(input, options);
