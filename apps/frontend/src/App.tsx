import { BrowserRouter as Router, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './context/AuthContext';
import { AppProviders } from './context/AppProviders';

import Header from './components/Navigation/Header';

import { AuthenticatedRoutes, UnauthenticatedRoutes } from './routes';
import { Suspense } from 'react';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <AppProviders>
      <>
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
        <ToastContainer />
      </>
    </AppProviders>
  );
};

export default App;
