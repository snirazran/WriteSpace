import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebase';
import { v4 } from 'uuid';
import placeHolder from '../media/placeholder.png';
import './CreateProject.css';
import { createProject } from '../features/projects/projectSlice';

function CreateProject() {
  const dispatch = useDispatch();

  //Functions to handle image upload
  const [imageFile, setImageFile] = useState(null);
  const [imageLocal, setImageLocal] = useState(null);

  const uploadImage = async () => {
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
  let unsplashAPISEARCH;

  const options = [
    { value: 'random', text: 'Random' },
    { value: 'colorful', text: 'Colorful' },
    { value: 'minimal', text: 'Minimal' },
    { value: 'textures', text: 'Textures' },
    { value: 'patterns', text: 'Patterns' },
    { value: 'abstract', text: 'Abstract' },
  ];

  const [selected, setSelected] = useState(options[0].value);
  let randomNum = Math.floor(Math.random() * 10);
  switch (selected) {
    case 'random':
      unsplashAPISEARCH = `photos/random${unsplashAPIKEY}`;
      break;
    case 'colorful':
      unsplashAPISEARCH = `search/photos/${unsplashAPIKEY}&query=colorful&orientation=portrait&page=${randomNum}`;
      break;
    case 'minimal':
      unsplashAPISEARCH = `search/photos/${unsplashAPIKEY}&query=minimal&orientation=portrait&page=${randomNum}`;
      break;
    case 'textures':
      unsplashAPISEARCH = `search/photos/${unsplashAPIKEY}&query=textures&orientation=portrait&page=${randomNum}`;
      break;
    case 'patterns':
      unsplashAPISEARCH = `search/photos/${unsplashAPIKEY}&query=patterns&orientation=portrait&page=${randomNum}`;
      break;
    case 'abstract':
      unsplashAPISEARCH = `search/photos/${unsplashAPIKEY}&query=abstract&orientation=portrait&page=${randomNum}`;
      break;
    default:
      unsplashAPISEARCH = `photos/random${unsplashAPIKEY}`;
  }

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = async (e) => {
    let randomImg = await getNewImage();
    setImageLocal(randomImg);
  };

  const getNewImage = async () => {
    if (selected === 'random') {
      return fetch(unsplashAPI + unsplashAPISEARCH)
        .then((response) => response.json())
        .then((data) => {
          let allImages = data;
          return allImages.urls.regular;
        });
    }
    let randomNum = Math.floor(Math.random() * 10);
    return fetch(unsplashAPI + unsplashAPISEARCH)
      .then((response) => response.json())
      .then((data) => {
        let allImages = data.results[randomNum];

        return allImages.urls.regular;
      });
  };

  //Functions to handle from data & project creation

  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    description: '',
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
      dispatch(createProject(projectData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="CreateProject">
        <div className="pick-photo">
          <label htmlFor="file-input">
            {imageLocal ? (
              <img src={imageLocal} alt="profile" />
            ) : (
              <img src={placeHolder} alt="profile" />
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
            ></textarea>
          </div>
          <div className="project-form-group">
            <button type="submit" className="btn btn-block">
              Create your project
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateProject;
