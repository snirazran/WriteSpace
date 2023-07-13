import React, { useState } from 'react';
import ProjectGenreSelector from '../Project/ProjectGenreSelector';
import QuickProjectBtn from '../Buttons/QuickProjectBtn';
import './QuickProject.css';

const QuickProject: React.FC = () => {
  const [isSelectorVisible, setSelectorVisible] = useState(false);

  const handleBtnClick = () => {
    setSelectorVisible(true);
  };

  const handleSelectorClose = () => {
    setSelectorVisible(false);
  };

  return (
    <section className="quick-post">
      {isSelectorVisible && (
        <ProjectGenreSelector close={handleSelectorClose} />
      )}
      <div className="qp-main">
        <h1>Write something new!</h1>
        <QuickProjectBtn onClick={handleBtnClick} />
      </div>
      <div className="qp-secondary"></div>
    </section>
  );
};

export default QuickProject;
