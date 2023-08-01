import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './context/AuthContext';
import { AppProviders } from './context/AppProviders';

import Login from './pages/Login/Login';
import Header from './components/Navigation/Header';
import Profile from './pages/Profile/Profile';
import ProjectPage from './pages/Project/ProjectPage';
import DocumentPage from './pages/Document/DocumentPage';
import CreateDocument from './pages/Document/CreateDocument';
import EditDocument from './pages/Document/EditDocument';
import EditProfile from './pages/Profile/EditProfile';
import Feed from './pages/Feed/Feed';
import { Suspense, lazy } from 'react';
const LazyRegister = lazy(() => import('./pages/Register/Register'));

const App: React.FC = () => {
  const { user } = useAuth();
  return (
    <AppProviders>
      <>
        <Router>
          <div className="container">
            <Header />
            <Routes>
              {user ? (
                <>
                  <Route path="/" element={<Feed />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/register"
                    element={
                      <Suspense>
                        <LazyRegister />
                      </Suspense>
                    }
                  />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route
                    path="/projects/project/:id"
                    element={<ProjectPage />}
                  />
                  <Route path="/document/create" element={<CreateDocument />} />
                  <Route path="/document/:id" element={<DocumentPage />} />
                  <Route path="/document/edit/:id" element={<EditDocument />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Feed />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<LazyRegister />} />
                </>
              )}
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </>
    </AppProviders>
  );
};

export default App;
