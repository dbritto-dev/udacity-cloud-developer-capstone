import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const handleClick = useCallback(() => loginWithRedirect(), []);

  return (
    <button
      className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
      type="button"
      onClick={handleClick}
    >
      Sign in
    </button>
  );
};
