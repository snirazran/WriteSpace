// Imports
import React from 'react';
import { AxiosResponse } from 'axios';
import { KeyedMutator } from 'swr';

// Local imports

import SecondSmallBtn from '../Buttons/SecondSmallBtn';
import './ProjectList.css';
import { GetAllUserProjectsDTO } from 'api-client/projects';
import Project from './Project';
import { Link } from 'react-router-dom';
import { UserDTO } from 'api-client/users';

type ProjectListProps = {
  close: () => void;
  userProjects: GetAllUserProjectsDTO | undefined;
  user: UserDTO | null;
};

const ProjectList: React.FC<ProjectListProps> = ({
  close,
  userProjects,
  user,
}) => {
  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();
  const projects = userProjects?.projects.slice(0, 4);
  return (
    <div className="project-list-overlay" onClick={close}>
      <div className="project-list" onClick={stopPropagation}>
        <h1>Project List</h1>
        {!projects?.length && <p>No friends yet</p>}
        {projects?.map((project, index) => (
          <Project key={project._id} project={project} />
        ))}
        {userProjects?.projects.length! > 1 && (
          <>
            <div className="view-all-projects">
              <Link to={`/profile/${user?._id}`}>
                <h1>View all projects</h1>
              </Link>
            </div>
          </>
        )}
        <div className="friend-list-closebtn">
          <SecondSmallBtn onClick={close} text="Close" />
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
