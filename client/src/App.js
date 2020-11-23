import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'materialize-css';

import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';

import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const { signin, signout, token, userId, ready } = useAuth();
  const isAuth = !!token;

  const routes = useRoutes(isAuth);

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{ signin, signout, token, userId, isAuth }}>
      <Router>
        {isAuth && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
