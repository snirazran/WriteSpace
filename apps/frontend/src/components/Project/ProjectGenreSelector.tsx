import MainSmallBtn from '../Buttons/MainSmallBtn';
import SecondSmallBtn from '../Buttons/SecondSmallBtn';
import './ProjectGenreSelector.css';
import book from '../../media/book.png';
import poem from '../../media/poem.png';
import diary from '../../media/diary.png';
import shortStory from '../../media/shortStory.png';
import song from '../../media/song.png';
import general from '../../media/general.png';
import { useEffect, useState } from 'react';
import { useCreateProject } from '../../features/projects/ProjectsApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type ProjectGenreSelectorProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

const ProjectGenreSelector: React.FC<ProjectGenreSelectorProps> = ({
  isActive,
  setIsActive,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const {
    trigger,
    data: createProjectResponse,
    reset,
    isLoading,
  } = useCreateProject();

  useEffect(() => {
    if (createProjectResponse) {
      navigate('/');
    }
    reset();
  }, [navigate, reset, createProjectResponse]);

  const genreBtnClicked = (genre: string) => {
    setSelectedGenre(genre);
  };

  const createProject = () => {
    if (selectedGenre === null) {
      return;
    }
    const projectData = {
      userId: user!._id,
      genre: selectedGenre,
    };
    trigger(projectData);
  };

  let gridItems = [
    {
      photo: book,
      text: 'Book',
    },
    {
      photo: shortStory,
      text: 'Short Story',
    },
    {
      photo: song,
      text: 'Song',
    },
    {
      photo: diary,
      text: 'Diary',
    },
    {
      photo: poem,
      text: 'Poem',
    },
    {
      photo: general,
      text: 'General',
    },
  ];

  return (
    <div className={`project-genre-selector ${isActive ? 'visible' : ''}`}>
      <h1>Create Project</h1>
      <div className="project-genre-selector-grid">
        {gridItems.map(({ photo, text }) => (
          <button
            onClick={() => genreBtnClicked(text)}
            className={`project-genre-selector-grid-item ${
              selectedGenre === text ? 'selected-genre-btn' : ''
            }`}
            key={text}
          >
            <div className="project-genre-selector-grid-item-photo">
              <img src={photo} alt="" />
            </div>
            <h2>{text}</h2>
          </button>
        ))}
      </div>
      <div className="project-genre-selector-buttons">
        <div className="project-genre-selector-buttons-cancle">
          <SecondSmallBtn onClick={() => setIsActive(false)} text="Cancel" />
        </div>
        <div className="project-genre-selector-buttons-create">
          <MainSmallBtn text="Create" />
        </div>
      </div>
    </div>
  );
};

export default ProjectGenreSelector;
