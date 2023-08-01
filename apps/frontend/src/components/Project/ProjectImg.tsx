import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import storage from '../../firebase';
import { ChangeEvent, useState } from 'react';
import config from '../../config';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './ProjectImg.css';
import { toast } from 'react-toastify';

type ProjectImgProps = {
  img?: string;
  updateFunc: (imgObj: { img: string }) => void;
};

const ProjectImg: React.FC<ProjectImgProps> = ({ img, updateFunc }) => {
  const [projectImg, setProjectImg] = useState(img);

  // Function to upload image
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setProjectImg(URL.createObjectURL(file));
    const uniqueFileName = `${file.name}${uuidv4()}`;
    const imageRef = ref(storage, `projectImages/${uniqueFileName}`);
    try {
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);
      return imageURL || '';
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  // Options for generating image from Unsplash
  const options = [
    { value: 'random', text: 'Random' },
    { value: 'colorful', text: 'Colorful' },
    { value: 'minimal', text: 'Minimal' },
    { value: 'textures', text: 'Textures' },
    { value: 'patterns', text: 'Patterns' },
    { value: 'abstract', text: 'Abstract' },
  ];

  const [selected, setSelected] = useState(options[0].value);

  // Handle selection change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  // Handle click on Generate button
  const handleClick = async () => {
    const generatedImg = await getNewImage();
    updateFunc({ img: generatedImg });
    setProjectImg(generatedImg);
    toast.success('Project image updated');
  };

  // Function to generate new image from Unsplash
  const getNewImage = async () => {
    const randomNum = Math.floor(Math.random() * 10);
    const unsplashAPISEARCH =
      selected === 'random'
        ? `photos/random${config.unsplashAPIKEY}`
        : `search/photos${config.unsplashAPIKEY}&query=${selected}&orientation=portrait&page=${randomNum}`;

    try {
      const response = await axios.get(
        `${config.unsplashAPI}${unsplashAPISEARCH}`
      );
      return selected === 'random'
        ? response.data.urls.regular
        : response.data.results[randomNum].urls.regular;
    } catch (error) {
      console.error(`Failed to get image from Unsplash: ${error}`);
      return '';
    }
  };

  return (
    <>
      <div className="projectbox-img">
        <label htmlFor="file-input">
          <div className="img-container">
            <img src={projectImg || 'path/to/error-image.jpg'} alt="project" />
          </div>
        </label>
        <input
          onChange={async (e: ChangeEvent<HTMLInputElement>) => {
            const img = await uploadImage(e);
            updateFunc({ img });
            toast.success('Project image updated');
          }}
          id="file-input"
          type="file"
          key="file"
        />
        <div className="pick-photo-text">
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
            image
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectImg;
