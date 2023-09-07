import { BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';
import Header from './components/Navigation/Header';

import { AuthenticatedRoutes, UnauthenticatedRoutes } from './routes';
import { Suspense, useEffect, useState } from 'react';
import Spinner from './components/Spinner';
import ServerSpinner from './components/ServerSpinner';
import { getEnvVar } from './utils/getENV';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <div className="container">
        <Header />
        <Suspense fallback={<Spinner />}>
          <Routes>
            {user ? [...AuthenticatedRoutes] : [...UnauthenticatedRoutes]}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
