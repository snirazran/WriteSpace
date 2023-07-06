import React, { useEffect, useState } from 'react';
import './QuickProject.css';
import { FaPen } from 'react-icons/fa';
import ProjectGenreSelector from '../Project/ProjectGenreSelector';

const QuickProject: React.FC = () => {
  const [isSelectorVisible, setSelectorVisible] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectorVisible(!isSelectorVisible);
  };

  const closeSelector = () => {
    setSelectorVisible(false);
  };
  return (
    <div
      className={`app ${isSelectorVisible ? 'darken-bg' : ''}`}
      onClick={closeSelector}
    >
      {isSelectorVisible && <ProjectGenreSelector onClose={closeSelector} />}
      <section className="quick-post">
        <div className="qp-main">
          <h1>Write something new!</h1>
          <button className="qp-btn" onClick={handleClick}>
            <FaPen />
          </button>
        </div>
        <div className="qp-secondary"></div>
      </section>
    </div>
  );
};

export default QuickProject;
