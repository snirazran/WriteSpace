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
import MainBtn from '../../components/Buttons/MainBtn';
import { docType } from '../../utils/DocTypeCheck';
import { useCreateDocument } from '../../features/documents/documentsApi';

const ProjectPage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const {
    data: project,
    error: projectError,
    isLoading: isLoadingProject,
    mutate: mutateProject,
  } = useGetUserProjectById(id!);

  const {
    data: document,
    error: documentError,
    isLoading: isLoadingDocument,
    reset: resetDocument,
    trigger: triggerDocument,
  } = useCreateDocument();

  useEffect(() => {
    if (projectError || documentError) {
      console.log(projectError || documentError);
    }
  }, [documentError, projectError]);

  const onClick = () => {
    const documentData = {
      userId: project!.data.userInfo.userId,
      projectId: project!.data._id,
      type: docType(project!.data.genre),
    };
    triggerDocument(documentData);
  };

  if (isLoadingProject || isLoadingDocument) {
    return <Spinner />;
  }

  return (
    <section className="ProjectPage">
      <BreadCrumbs content={project?.data}></BreadCrumbs>
      <ProjectBox content={project?.data} deleteFunc={useDeleteProject} />
      {/* <Slider content={posts} /> */}
      <MainBtn
        btnText={`Create a new ${docType(project?.data.genre!)}`}
        onClick={onClick}
      ></MainBtn>
    </section>
  );
};

export default ProjectPage;
