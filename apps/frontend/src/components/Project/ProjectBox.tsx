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
  const [editMode, setEditMode] = useState(false);
  const [projectName, setProjectName] = useState(content?.name);
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

  const onEditClick = (id: string) => {
    navigate(`/projects/project/edit/${id}`);
    window.scrollTo(0, 0);
  };

  const onSubmit = (data: any) => {
    setEditMode(false);
    trigger({ name: data.name });
    setProjectName(data.name);
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
            {editMode ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register('name', {
                    maxLength: {
                      value: 25,
                      message: 'Input exceeded 25 characters',
                    },
                  })}
                  defaultValue={projectName}
                  autoFocus
                  onBlur={handleSubmit(onSubmit)}
                />
                {errors.name && <p>{errors.name.message as string}</p>}
              </form>
            ) : (
              <h1 onClick={() => setEditMode(true)}>{projectName}</h1>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
