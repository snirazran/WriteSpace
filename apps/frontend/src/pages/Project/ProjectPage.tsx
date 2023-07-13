import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner';
import './ProjectPage.css';
import ProjectBox from '../../components/Project/ProjectBox';
import BreadCrumbs from '../../components/Navigation/BreadCrumbs';
import {
  useGetUserProjectById,
  useDeleteProject,
} from '../../features/projects/ProjectsApi';
import MainBtn from '../../components/Buttons/MainBtn';
import { docType } from '../../utils/DocTypeCheck';
import {
  useCreateDocument,
  useGetAllProjectDocuments,
} from '../../features/documents/documentsApi';
import DocumentSlider from '../../components/DocumentSlider';

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
    data: documents,
    error: documentsError,
    isLoading: isLoadingDocuments,
    mutate: mutateDocuments,
  } = useGetAllProjectDocuments(id!);

  useEffect(() => {
    if (projectError || documentsError) {
      console.log(projectError || documentsError);
    }
  }, [projectError]);

  if (isLoadingProject || isLoadingDocuments) {
    return <Spinner />;
  }
  return (
    <section className="ProjectPage">
      <BreadCrumbs content={project?.data}></BreadCrumbs>
      <ProjectBox content={project?.data} deleteFunc={useDeleteProject} />
      <DocumentSlider
        project={project}
        documents={documents}
        content={documents?.data}
      />
    </section>
  );
};

export default ProjectPage;
