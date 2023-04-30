import { lazy } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';

import Login from './pages/Login';
import Header from './components/Navigation/Header';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectPage from './pages/ProjectPage';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import EditProject from './pages/EditProject';
import EditProfile from './pages/EditProfile';

const Feed = lazy(() => import('./pages/Feed/Feed'));
const Register = lazy(() => import('./pages/Register'));

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  return <AxiosProvider user={user}>{children}</AxiosProvider>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProviders>
        <>
          <Router>
            <div className="container">
              <Header />
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/edit/:id" element={<EditProfile />} />
                <Route path="/projects/create" element={<CreateProject />} />
                <Route path="/projects/project/:id" element={<ProjectPage />} />
                <Route
                  path="/projects/project/edit/:id"
                  element={<EditProject />}
                />
                <Route path="/projects/:userId" element={<Projects />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/posts/edit/:id" element={<EditPost />} />
              </Routes>
            </div>
          </Router>
          <ToastContainer />
        </>
      </AppProviders>
    </AuthProvider>
  );
};

export default App;
