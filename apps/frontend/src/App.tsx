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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let serviceURLs = [
      getEnvVar('VITE_API_USERS_SERVICE_URL'),
      getEnvVar('VITE_API_AUTH_SERVICE_URL'),
      getEnvVar('VITE_API_DOCUMENTS_SERVICE_URL'),
      getEnvVar('VITE_API_PROJECTS_SERVICE_URL'),
    ];

    const intervalIDs: { [url: string]: NodeJS.Timeout } = {};

    const handleSuccessfulFetch = (url: string) => {
      serviceURLs = serviceURLs.filter((serviceURL) => serviceURL !== url);

      if (serviceURLs.length === 0) {
        setIsLoading(false);
      }

      if (intervalIDs[url]) {
        clearInterval(intervalIDs[url]);
        delete intervalIDs[url];
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

    const pollService = (url: string) => {
      fetchData(url).then((isSuccessful) => {
        if (isSuccessful) {
          handleSuccessfulFetch(url);
        }
      });
    };

    serviceURLs.forEach((url) => {
      pollService(url);

      const intervalID = setInterval(() => pollService(url), 5000);

      intervalIDs[url] = intervalID;
    });

    return () => {
      Object.values(intervalIDs).forEach((intervalID) =>
        clearInterval(intervalID)
      );
    };
  }, []);

  const { user } = useAuth();

  if (isLoading) {
    return <ServerSpinner />;
  }
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
