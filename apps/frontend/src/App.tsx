import { BrowserRouter as Router, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './context/AuthContext';
import { AppProviders } from './context/AppProviders';

import Header from './components/Navigation/Header';

import { AuthenticatedRoutes, UnauthenticatedRoutes } from './routes';
import { Suspense, useEffect, useState } from 'react';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const serviceURLs = [
      'https://write-space-user-service.onrender.com/api/users',
      'https://write-space-auth-service.onrender.com/api/auth',
      'https://write-space-documents-service.onrender.com/api/documents',
      'https://write-space-projects-service.onrender.com/api/projects',
    ];

    const intervalIDs: NodeJS.Timeout[] = [];

    const handleSuccessfulFetch = (url: string) => {
      const index = serviceURLs.indexOf(url);
      if (index > -1) {
        serviceURLs.splice(index, 1);
      }

      if (serviceURLs.length === 0) {
        setIsLoading(false);
      }
    };

    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          return true;
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
      return false;
    };

    serviceURLs.forEach((url) => {
      const intervalID = setInterval(() => {
        fetchData(url).then((isSuccessful) => {
          if (isSuccessful) {
            clearInterval(intervalID);
            handleSuccessfulFetch(url);
          }
        });
      }, 5000);

      intervalIDs.push(intervalID);
    });

    return () => {
      intervalIDs.forEach((id) => clearInterval(id));
    };
  }, []);

  const { user } = useAuth();

  if (isLoading) {
    return <h1>loading baby</h1>;
  }

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
