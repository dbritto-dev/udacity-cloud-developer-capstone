import React, { Suspense } from 'react';
import './styles.css';

import { LoginButton } from 'components/LoginButton';
import { LogoutButton } from 'components/LogoutButton';
import { Profile } from 'components/Profile';
import { Todos } from 'components/Todos';
import { Dashboard } from 'components/Dashboard';

function App() {
  return (
    <>
      {/* <LoginButton />
      <LogoutButton />
      <Profile />
      <Suspense fallback={<div>Loading...</div>}>
        <Todos />
      </Suspense> */}
      <Dashboard />
    </>
  );
}

export default App;
