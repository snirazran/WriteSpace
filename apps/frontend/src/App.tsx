import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './context/AuthContext';
import { AppProviders } from './context/AppProviders';

import Login from './pages/Login/Login';
import Header from './components/Navigation/Header';
import Profile from './pages/Profile/Profile';
import CreateProject from './pages/CreateProject';
import ProjectPage from './pages/ProjectPage';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import EditProject from './pages/EditProject';
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
                  <Route path="/projects/create" element={<CreateProject />} />
                  <Route
                    path="/projects/project/:id"
                    element={<ProjectPage />}
                  />
                  <Route
                    path="/projects/project/edit/:id"
                    element={<EditProject />}
                  />
                  <Route path="/posts/create" element={<CreatePost />} />
                  <Route path="/posts/:id" element={<PostPage />} />
                  <Route path="/posts/edit/:id" element={<EditPost />} />
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
