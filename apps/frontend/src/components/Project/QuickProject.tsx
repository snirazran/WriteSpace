import React, { useEffect, useState } from 'react';
import './QuickProject.css';
import { FaPen } from 'react-icons/fa';
import ProjectGenreSelector from '../Project/ProjectGenreSelector';

function QuickProject() {
  const [isActvie, setIsActive] = useState(false);

  const btnClicked = () => {
    setIsActive(!isActvie);
  };

  if (isActvie) {
    document.body.classList.add('show-div');
  } else {
    document.body.classList.remove('show-div');
  }

  return (
    <React.Fragment>
      {isActvie && (
        <ProjectGenreSelector setIsActive={btnClicked} isActive={isActvie} />
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
