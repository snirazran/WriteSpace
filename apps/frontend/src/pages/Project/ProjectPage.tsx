import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner';
import './ProjectPage.css';
import ProjectBox from '../../components/Project/ProjectBox';
import { useGetUserProjectById } from '../../features/projects/ProjectsApi';
import { useGetAllProjectDocuments } from '../../features/documents/documentsApi';
import DocumentSlider from '../../components/Documents/DocumentSlider';
import { toast } from 'react-toastify';

const ProjectPage = () => {
  let { id } = useParams();
  const {
    data: project,
    error: projectError,
    isLoading: isLoadingProject,
    mutate: mutateProject,
  } = useGetUserProjectById(id!, { refreshInterval: 5000, errorRetryCount: 5 });

  const {
    data: documents,
    error: documentsError,
    isLoading: isLoadingDocuments,
    mutate: mutateDocuments,
  } = useGetAllProjectDocuments(id!, {
    refreshInterval: 5000,
    errorRetryCount: 5,
  });

  useEffect(() => {
    if (projectError || documentsError) {
      console.log(projectError || documentsError);
      toast.error('Something went wrong');
    }
  }, [projectError]);

  if (isLoadingProject || isLoadingDocuments) {
    return <Spinner />;
  }
  return (
    <section className="ProjectPage">
      <ProjectBox content={project?.data} mutateProject={mutateProject} />
      <DocumentSlider
        project={project}
        documents={documents}
        content={documents?.data}
        mutateDocuments={mutateDocuments}
      />
    </section>
  );
};

export default ProjectPage;
