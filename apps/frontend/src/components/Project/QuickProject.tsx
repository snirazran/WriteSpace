import React, { useEffect, useState } from 'react';
import './QuickProject.css';
import { FaPen } from 'react-icons/fa';
import ProjectGenreSelector from '../Project/ProjectGenreSelector';

function QuickProject() {
  const [isActive, setIsActive] = useState(false);

  const btnClicked = () => {
    setIsActive(!isActive);
  };

  return (
    <React.Fragment>
      {isActive && (
        <ProjectGenreSelector setIsActive={btnClicked} isActive={isActive} />
      )}
      <section className="quick-post">
        <div className="qp-main">
          <h1>Write something new!</h1>
          <button className="qp-btn" onClick={btnClicked}>
            <FaPen />
          </button>
        </div>
        <div className="qp-secondary"></div>
      </section>
    </React.Fragment>
  );
}

export default QuickProject;
