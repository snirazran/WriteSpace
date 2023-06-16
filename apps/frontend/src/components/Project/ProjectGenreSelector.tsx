import MainSmallBtn from '../Buttons/MainSmallBtn';
import SecondSmallBtn from '../Buttons/SecondSmallBtn';
import './ProjectGenreSelector.css';
type ProjectGenreSelectorProps = {
  isClicked: boolean;
};
const ProjectGenreSelector: React.FC<ProjectGenreSelectorProps> = ({
  isClicked,
}) => {
  return (
    <div className={`project-genre-selector ${isClicked ? 'visible' : ''}`}>
      <h1>Create Project</h1>
      <div className="project-genre-selector-grid">
        <div className="project-genre-selector-grid-item">
          <img src="" alt="" />
          <h2>Book</h2>
        </div>
        <div className="project-genre-selector-grid-item">
          <img src="" alt="" />
          <h2>Short Story</h2>
        </div>
        <div className="project-genre-selector-grid-item">
          <img src="" alt="" />
          <h2>Songs</h2>
        </div>
        <div className="project-genre-selector-grid-item">
          <img src="" alt="" />
          <h2>Diary</h2>
        </div>
        <div className="project-genre-selector-grid-item">
          <img src="" alt="" />
          <h2>Poems</h2>
        </div>
        <div className="project-genre-selector-grid-item">
          <img src="" alt="" />
          <h2>General</h2>
        </div>
      </div>
      <div className="project-genre-selector-buttons"></div>
      <SecondSmallBtn text="Cancel" />
      <MainSmallBtn text="Create" />
    </div>
  );
};

export default ProjectGenreSelector;
