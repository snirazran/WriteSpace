import { lazy } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './context/AuthContext';

import { AuthProvider } from './context/AuthContext';
import { AppProviders } from './context/AppProviders';

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
import Feed from './pages/Feed/Feed';
import Register from './pages/Register';

const App: React.FC = () => {
  const { user } = useAuth();
  return (
    <AuthProvider>
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
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile/edit/:id" element={<EditProfile />} />
                    <Route path="/projects" element={<Projects />}>
                      <Route path="/create" element={<CreateProject />} />
                      <Route path="/project/:id" element={<ProjectPage />} />
                      <Route
                        path="/project/edit/:id"
                        element={<EditProject />}
                      />
                      <Route path="/:userId" element={<Projects />} />
                    </Route>
                    <Route path="/posts" element={<PostPage />}>
                      <Route path="/create" element={<CreatePost />} />
                      <Route path="/:id" element={<PostPage />} />
                      <Route path="/edit/:id" element={<EditPost />} />
                    </Route>
                  </>
                ) : (
                  <></>
                )}
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
