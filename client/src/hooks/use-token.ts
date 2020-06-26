import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export const useToken = (): string | undefined => {
  const [token, setToken] = useState<string>()
  const { isAuthenticated, getIdTokenClaims } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) return

    const getToken = async () => {
      const { __raw: idToken } = await getIdTokenClaims()
      setToken(idToken)
    }

    getToken()
  }, [isAuthenticated])

  return token
}
