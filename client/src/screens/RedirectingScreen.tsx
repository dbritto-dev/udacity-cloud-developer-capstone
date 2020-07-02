import React from 'react';

export const RedirectingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-900 text-center py-4 lg:px-4">
      <div
        className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          Authenticating
        </span>
        <span className="font-semibold mr-2 text-left flex-auto">
          Auto-authentication with with Auth0
        </span>
      </div>
    </div>
  );
};
