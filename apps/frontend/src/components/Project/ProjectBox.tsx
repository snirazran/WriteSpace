import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectBox.css';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { ProjectResponseDTO } from 'api-client/projects';
import { toCapital } from '../../utils/toCapital';
import {
  useDeleteProject,
  useUpdateProject,
} from '../../features/projects/ProjectsApi';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';
import ProjectImg from './ProjectImg';

type ProjectBoxProps = {
  content?: ProjectResponseDTO;
  mutateProject: KeyedMutator<AxiosResponse<ProjectResponseDTO, any>>;
};

const ProjectBox: React.FC<ProjectBoxProps> = ({ content, mutateProject }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [editNameMode, setEditNameMode] = useState(false);
  const [editDescriptionMode, setEditDescriptionMode] = useState(false);
  const [projectName, setProjectName] = useState(content?.name);
  const [projectDescription, setProjecDescription] = useState(
    content?.description
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    data: updatedProject,
    error: updateError,
    isLoading: isUpdating,
    reset: resetUpdate,
    trigger: updateFunc,
  } = useUpdateProject(content?._id!);

  const {
    data: deletedProject,
    error: deleteError,
    isLoading: isDeleting,
    reset: resetDelete,
    trigger: deleteFunc,
  } = useDeleteProject(content?._id!);

  let isUserProject = () =>
    user?._id === content?.userInfo.userId ? true : false;

  const deleteContent = () => {
    deleteFunc();
    if (!isDeleting) {
      navigate(`/profile/${user!._id}`);
      toast.success('Project deleted successfully');
    }
  };

  const onNameSubmit = (data: any) => {
    setEditNameMode(false);
    updateFunc({ name: data.name });
    setProjectName(data.name);
    toast.success('Project updated');
  };

  const onDescriptionSubmit = (data: any) => {
    setEditDescriptionMode(false);
    updateFunc({ description: data.description });
    setProjecDescription(data.description);
    toast.success('Project updated');
  };

  useEffect(() => {
    mutateProject();
  }, [updatedProject]);

  useEffect(() => {
    if (deleteError) {
      toast.error('Project could not be deleted');
    }
    if (updateError) {
      toast.error('Project could not be updated');
    }
  }, [updateError, deleteError]);

  if (isDeleting) {
    return <Spinner />;
  }

  return (
    <div className="project">
      <div className="project-box">
        {isUserProject() ? (
          <div className="trash-btn" onClick={deleteContent}>
            <FaTrash />
          </div>
        ) : (
          <></>
        )}
        <div className="project-details">
          <div className="project-datails-image">
            {isUserProject() ? (
              <ProjectImg
                mutateProject={mutateProject}
                updateFunc={updateFunc}
                img={content?.img}
              />
            ) : (
              <img src={content?.img} alt="" />
            )}
          </div>

          <div className="project-details-text">
            {isUserProject() &&
              (editNameMode ? (
                <form onSubmit={handleSubmit(onNameSubmit)}>
                  <input
                    {...register('name', {
                      maxLength: {
                        value: 25,
                        message: 'Input exceeded 25 characters',
                      },
                    })}
                    placeholder="Add a title..."
                    defaultValue={projectName}
                    autoFocus
                    onBlur={handleSubmit(onNameSubmit)}
                  />
                  {errors.name && <p>{errors.name.message as string}</p>}
                </form>
              ) : (
                <h1 onClick={() => setEditNameMode(true)}>
                  {projectName?.trim() === '' ? 'Add a title...' : projectName}
                </h1>
              ))}
            {!isUserProject() && (
              <h1>
                {projectName?.trim() === '' ? 'Add a title...' : projectName}
              </h1>
            )}
            <div className="project-details-author">
              <p>
                <span>{content?.genre}, </span>
                <Link to={`/profile/${content?.userInfo.userId}`}>
                  {`By ${
                    content?.userInfo.username ??
                    toCapital(content?.userInfo.username)
                  }`}
                </Link>
              </p>
              <Link to={`/profile/${content?.userInfo.userId}`}>
                <div className="project-author-img">
                  <img src={content?.userInfo.img} alt="" />
                </div>
              </Link>
            </div>
            <div className="project-details-description">
              {isUserProject() &&
                (editDescriptionMode ? (
                  <form onSubmit={handleSubmit(onDescriptionSubmit)}>
                    <input
                      {...register('description', {
                        maxLength: {
                          value: 100,
                          message: 'Input exceeded 100 characters',
                        },
                      })}
                      placeholder="Add synopsis..."
                      defaultValue={projectDescription}
                      autoFocus
                      onBlur={handleSubmit(onDescriptionSubmit)}
                    />
                    {errors.description && (
                      <p>{errors.description.message as string}</p>
                    )}
                  </form>
                ) : (
                  <p onClick={() => setEditDescriptionMode(true)}>
                    {projectDescription?.trim() === ''
                      ? 'Add synopsis...'
                      : projectDescription}
                  </p>
                ))}
              {!isUserProject() && (
                <p>
                  {projectDescription?.trim() === ''
                    ? 'Add synopsis...'
                    : projectDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
