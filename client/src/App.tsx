import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './styles.css';

import { ProtectedRoute } from 'components/ProtectedRoute';
import { DashboardScreen } from 'screens/DashboardScreen';
import { EditTodosItemScreen } from 'screens/EditTodosItemScreen';
import { RedirectingScreen } from 'screens/RedirectingScreen';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <ProtectedRoute
          path="/:todoId"
          component={EditTodosItemScreen}
          onRedirecting={() => <RedirectingScreen />}
        />
        <ProtectedRoute
          path="/"
          component={DashboardScreen}
          onRedirecting={() => <RedirectingScreen />}
        />
      </Switch>
    </Router>
  );
}

export default App;
