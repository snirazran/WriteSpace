import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner';
import Slider from '../../components/Slider';
import './ProjectPage.css';
import ProjectBox from '../../components/Project/ProjectBox';
import BreadCrumbs from '../../components/Navigation/BreadCrumbs';
import {
  useGetUserProjectById,
  useDeleteProject,
} from '../../features/projects/ProjectsApi';

function ProjectPage() {
  const navigate = useNavigate();
  let { id } = useParams();
  const {
    data: project,
    error,
    isLoading,
    mutate,
  } = useGetUserProjectById(id!);
  console.log(project?.data);
  useEffect(() => {}, []);

  const onClick = () => {
    navigate('/posts/create', { state: { projectId: id } });
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="ProjectPage">
      <BreadCrumbs content={project?.data}></BreadCrumbs>
      <ProjectBox content={project?.data} deleteFunc={useDeleteProject} />
      {/* <Slider content={posts} /> */}
      <button onClick={onClick} className="box-btn">
        Create a new post
      </button>
    </section>
  );
}

export default ProjectPage;
