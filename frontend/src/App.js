import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Navigation/Header';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectPage from './pages/ProjectPage';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import EditProject from './pages/EditProject';
import EditProfile from './pages/EditProfile';

function App() {
  return (
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
  );
}

export default App;
