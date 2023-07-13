import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useCreateProject } from '../../features/projects/ProjectsApi';
import MainSmallBtn from '../Buttons/MainSmallBtn';
import SecondSmallBtn from '../Buttons/SecondSmallBtn';
import './ProjectGenreSelector.css';
import book from '../../media/book.png';
import diary from '../../media/diary.png';
import general from '../../media/general.png';
import poem from '../../media/poem.png';
import shortStory from '../../media/shortStory.png';
import song from '../../media/song.png';

type ProjectGenreSelectorProps = {
  close: () => void;
};

const gridItems = [
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
    text: 'Songs',
  },
  {
    photo: diary,
    text: 'Diary',
  },
  {
    photo: poem,
    text: 'Poems',
  },
  {
    photo: general,
    text: 'General',
  },
];

const ProjectGenreSelector: React.FC<ProjectGenreSelectorProps> = ({
  close,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const {
    trigger,
    data: createProjectResponse,
    reset,
    isLoading,
  } = useCreateProject();

  useEffect(() => {
    if (createProjectResponse) {
      navigate(`/projects/project/${createProjectResponse.data._id}`);
      reset();
    }
  }, [createProjectResponse, navigate, reset]);

  const genreBtnClicked = (genre: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedGenre(genre);
  };

  const createProject = async () => {
    if (!selectedGenre) {
      toast.error('Please pick a project genre');
      return;
    }

    const projectData = {
      userId: user!._id,
      genre: selectedGenre,
    };
    await trigger(projectData);
  };

  return (
    <div className="project-create-overlay" onClick={close}>
      <div
        className="project-genre-selector"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Create Project</h1>
        <div className="project-genre-selector-grid">
          {gridItems.map(({ photo, text }) => (
            <button
              onClick={(event) => genreBtnClicked(text, event)}
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
            <SecondSmallBtn onClick={close} text="Cancel" />
          </div>
          <div className="project-genre-selector-buttons-create">
            <MainSmallBtn onClick={createProject} text="Create" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGenreSelector;
