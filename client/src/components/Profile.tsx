import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetch } from 'utils/unfetch';

export const Profile = () => {
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      const API_URI = process.env.REACT_APP_API_URI;
      const { __raw: token } = await getIdTokenClaims();

      console.log(API_URI, token);
      console.log(
        await fetch(`${API_URI}/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    })();
  }, [user, isAuthenticated]);

  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {JSON.stringify(user)}
    </div>
  ) : null;
};
