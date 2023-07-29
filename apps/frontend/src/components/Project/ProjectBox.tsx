import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectBox.css';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { ProjectResponseDTO } from 'api-client/projects';
import { toCapital } from '../../utils/toCapital';
import { useUpdateProject } from '../../features/projects/ProjectsApi';

type ProjectBoxProps = {
  content?: ProjectResponseDTO;
  deleteFunc: (id: string) => void;
};

const ProjectBox: React.FC<ProjectBoxProps> = ({ content, deleteFunc }) => {
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
    data,
    error,
    isLoading: isMutating,
    reset,
    trigger,
  } = useUpdateProject(content?._id!);

  let isUserProject = () =>
    user?._id === content?.userInfo.userId ? true : false;

  const deleteContent = () => {
    deleteFunc(content?.userInfo.userId!);
    navigate(`/profile/${user!._id}`);
  };

  const onNameSubmit = (data: any) => {
    setEditNameMode(false);
    trigger({ name: data.name });
    setProjectName(data.name);
  };

  const onDescriptionSubmit = (data: any) => {
    setEditDescriptionMode(false);
    trigger({ description: data.description });
    setProjecDescription(data.description);
  };

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
            <img src={content?.img} alt="" />
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
