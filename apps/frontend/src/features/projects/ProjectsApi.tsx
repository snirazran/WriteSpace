import { useEffect, useState } from 'react';
import SWRMutate from 'swr/mutation';
import SWR from 'swr';
import {
  CreateProjectRequestDTO,
  ProjectsApiFactory,
  UpdateProjectRequestDTO,
} from 'api-client/projects';
import { useAxios } from '../../context/AxiosContext';

export const useProjectsApi = () => {
  const axios = useAxios();
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:3002');
  const [api, setApi] = useState(
    ProjectsApiFactory(
      {
        isJsonMime: (mime) => mime === 'application/json',
      },
      apiBaseUrl,
      axios
    )
  );

  useEffect(() => {
    setApi(
      ProjectsApiFactory(
        {
          isJsonMime: (mime) => mime === 'application/json',
        },
        apiBaseUrl,
        axios
      )
    );
  }, [axios]);

  return api;
};

export const useCreateProject = () => {
  const { projectsControllerCreateProject } = useProjectsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'createProject',
    (_url: string, { arg }: { arg: CreateProjectRequestDTO }) =>
      projectsControllerCreateProject(arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useGetAllUserProjects = (id: string) => {
  const { projectsControllerGetAllUserProjects } = useProjectsApi();

  const fetcher = (_key: string) => projectsControllerGetAllUserProjects(id);

  const { data, error, isLoading, mutate } = SWR(`allProjects-${id}`, fetcher);

  return { data, error, isLoading, mutate };
};

export const useGetUserProjectById = (projectId: string) => {
  const { projectsControllerGetUserProjectById } = useProjectsApi();
  const { data, error, isLoading, mutate } = SWR(
    projectId,
    projectsControllerGetUserProjectById
  );
  return { data, error, isLoading, mutate };
};

export const useUpdateProject = (id: string) => {
  const { projectsControllerUpdateProject } = useProjectsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'updateProject',
    (_url: string, { arg }: { arg: UpdateProjectRequestDTO }) =>
      projectsControllerUpdateProject(id, arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useDeleteProject = (id: string) => {
  const { projectsControllerDeleteProject } = useProjectsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'deleteProject',
    (_url: string) => projectsControllerDeleteProject(id)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};
