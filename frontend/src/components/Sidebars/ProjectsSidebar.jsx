import './ProjectsSidebar.css';

import ProjectSidebarItem from './ProjectSidebarItem';

function ProjectsSidebar({ content }) {
  return (
    <div className="sidebar your-projects">
      <h1>Your Projects</h1>
      {content.map((content) => (
        <ProjectSidebarItem key={content._id} project={content} />
      ))}
    </div>
  );
}

export default ProjectsSidebar;
