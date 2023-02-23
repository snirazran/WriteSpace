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
import Scribble from './pages/Scribble';
import CreateScribble from './pages/CreateScribble';
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
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/project/page" element={<ProjectPage />} />
            <Route path="/scribble" element={<Scribble />} />
            <Route path="/scribble/create" element={<CreateScribble />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
