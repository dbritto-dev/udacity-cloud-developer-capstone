import unfetch from 'unfetch'

export const fetch = async <T>(
  input: RequestInfo,
  options?: RequestInit
): Promise<T> =>
  new Promise((resolve, reject) =>
    unfetch(input, options).then((r) => (r.ok ? resolve(r.json()) : reject(r)))
  )

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
              ...(options?.headers
                ? { ...options.headers, Authorization: `Bearer ${token}` }
                : { Authorization: `Bearer ${token}` })
            }
          : { headers: { Authorization: `Bearer ${token}` } }
      )
    : fetch<T>(input, options)
