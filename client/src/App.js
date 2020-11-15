import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'materialize-css';

import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';

function App() {
  const { signin, signout, token, userId } = useAuth();
  const isAuth = !!token;

  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{ signin, signout, token, userId, isAuth }}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
