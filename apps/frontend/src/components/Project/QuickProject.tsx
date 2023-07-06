import React, { useEffect, useState } from 'react';
import './QuickProject.css';
import { FaPen } from 'react-icons/fa';
import ProjectGenreSelector from '../Project/ProjectGenreSelector';

const QuickProject: React.FC = () => {
  const [isSelectorVisible, setSelectorVisible] = useState(false);

  const onBtnClick = () => {
    setSelectorVisible(true);
  };

  return (
    <section className="quick-post">
      {isSelectorVisible && (
        <ProjectGenreSelector close={() => setSelectorVisible(false)} />
      )}
      <div className="qp-main">
        <h1>Write something new!</h1>
        <button className="qp-btn" onClick={onBtnClick}>
          <FaPen />
        </button>
      </div>
      <div className="qp-secondary"></div>
    </section>
  );
};

export default QuickProject;
