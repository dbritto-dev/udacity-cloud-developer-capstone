import React from 'react';
import './styles.css';

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
