import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebase';
import { v4 } from 'uuid';
import placeHolder from '../media/placeholder.png';
import Spinner from '../components/Spinner';
import './CreateProject.css';
import {
  getProject,
  updateProject,
  resetProjects,
} from '../features/projects/projectSlice';

function EditProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { projects, projectIsLoading, projectIsError, projectMessage } =
    useSelector((state) => state.projects);

  //Getting the project from the data base
  useEffect(() => {
    if (projectIsError) {
      console.log(projectMessage);
    }

    dispatch(getProject(id));

    return () => {
      dispatch(resetProjects());
    };
  }, [projectIsError, projectMessage, dispatch, id]);

  //Functions to handle image upload
  const [imageFile, setImageFile] = useState(null);
  const [imageLocal, setImageLocal] = useState(null);

  const uploadImage = async () => {
    if (imageLocal === null) {
      return projects.img;
    }
    if (imageLocal.includes('https://images.unsplash.com')) {
      return imageLocal;
    }
    const imageRef = ref(storage, `projectImages/${imageFile.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageRef);
      if (imageURL) {
        return imageURL;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Functions to handle Unsplash image generator
  let unsplashAPI = `https://api.unsplash.com/`;
  let unsplashAPIKEY = `?client_id=` + process.env.REACT_APP_UNSPLASH_KEY;

  const options = [
    { value: 'random', text: 'Random' },
    { value: 'colorful', text: 'Colorful' },
    { value: 'minimal', text: 'Minimal' },
    { value: 'textures', text: 'Textures' },
    { value: 'patterns', text: 'Patterns' },
    { value: 'abstract', text: 'Abstract' },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = async (e) => {
    let randomImg = await getNewImage();
    setImageLocal(randomImg);
  };

  const getNewImage = async () => {
    if (selected === 'random') {
      let unsplashAPISEARCH = `photos/random${unsplashAPIKEY}`;
      try {
        let { data: images } = await axios.get(unsplashAPI + unsplashAPISEARCH);
        if (images) {
          return images.urls.regular;
        }
      } catch (error) {
        console.log(error);
      }
    }
    let randomNum = Math.floor(Math.random() * 10);
    let unsplashAPISEARCH = `search/photos/${unsplashAPIKEY}&query=${selected}&orientation=portrait&page=${randomNum}`;
    try {
      let { data: images } = await axios.get(unsplashAPI + unsplashAPISEARCH);
      if (images) {
        let allImages = images.results[randomNum];
        return allImages.urls.regular;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Functions to handle from data & project creation

  const [formData, setFormData] = useState({
    name: projects.name,
    genre: projects.genre,
    description: projects.description,
  });

  const { name, genre, description } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const img = await uploadImage();
      const projectData = {
        name,
        genre,
        description,
        img,
      };
      dispatch(updateProject({ id: id, projectData: projectData }));
      navigate(`/projects/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (projectIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="CreateProject">
        <div className="edit-text">
          <h1>Editing the project {projects.name}</h1>
        </div>
        <div className="pick-photo">
          <label htmlFor="file-input">
            {imageLocal ? (
              <img src={imageLocal} alt="profile" />
            ) : (
              <img src={projects.img} alt="profile" />
            )}
          </label>
          <input
            onChange={(e) => {
              setImageLocal(URL.createObjectURL(e.target.files[0]));
              setImageFile(e.target.files[0]);
            }}
            id="file-input"
            type="file"
            key="file"
          />
          <div className="pick-photo-text">
            <p>Upload a photo or</p>
            <p>
              <span onClick={handleClick}>Generate</span> a{' '}
              <select
                value={selected}
                onChange={handleChange}
                name="sort"
                className="sort"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              one
            </p>
          </div>
        </div>
      </section>

      <section className="project-form">
        <form onSubmit={onSubmit}>
          <div className="name-genre">
            <div className="project-form-group">
              <input
                type="text"
                className="form-control name"
                id="project-name"
                name="name"
                value={name}
                placeholder="Project Name"
                onChange={onChange}
                required
              />
            </div>
            <div className="project-form-group">
              <input
                type="text"
                className="form-control genre"
                id="genre"
                name="genre"
                value={genre}
                placeholder="Genre: Diary, Book, Poem, Script, eg..."
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="project-form-group">
            <textarea
              id="description"
              name="description"
              className="form-control description"
              rows="2"
              cols="10"
              minLength="10"
              maxLength="150"
              value={description}
              placeholder="Description"
              onChange={onChange}
              required
            ></textarea>
          </div>
          <div className="project-form-group">
            <button type="submit" className="btn btn-block">
              Update your project
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditProject;
