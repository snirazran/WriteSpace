import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import storage from '../../firebase';
import { ChangeEvent, useEffect, useState } from 'react';
import config from '../../config';
import { v4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';
import './ProjectImg.css';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';
import { ProjectResponseDTO } from 'api-client/projects';
type ProjectImgProps = {
  img?: string;
  updateFunc: any;
  mutateProject: KeyedMutator<AxiosResponse<ProjectResponseDTO, any>>;
};

const ProjectImg: React.FC<ProjectImgProps> = ({
  img,
  updateFunc,
  mutateProject,
}) => {
  //Functions to handle image upload
  const [projectImg, setProjectImg] = useState(img);
  const [imageFile, setImageFile] = useState<File>();

  const uploadImage = async () => {
    if (!imageFile) return;
    console.log(imageFile);
    const imageRef = ref(storage, `projectImages/${imageFile.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageRef);
      if (imageURL) {
        updateFunc({ img: imageURL });
        console.log('uploading image');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    { value: 'random', text: 'random' },
    { value: 'colorful', text: 'colorful' },
    { value: 'minimal', text: 'minimal' },
    { value: 'textures', text: 'textures' },
    { value: 'patterns', text: 'patterns' },
    { value: 'abstract', text: 'abstract' },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleClick = async () => {
    let generatedImg = await getNewImage();
    updateFunc({ img: generatedImg });
    setProjectImg(generatedImg);
    toast.success('Project updated');
  };

  const getNewImage = async () => {
    let unsplashAPISEARCH: string;
    const randomNum = Math.floor(Math.random() * 10);

    if (selected === 'random') {
      unsplashAPISEARCH = `photos/random${config.unsplashAPIKEY}`;
    } else {
      unsplashAPISEARCH = `search/photos${config.unsplashAPIKEY}&query=${selected}&orientation=portrait&page=${randomNum}`;
    }
    try {
      const response = await axios.get(
        `${config.unsplashAPI}${unsplashAPISEARCH}`
      );
      if (selected === 'random') {
        return response.data.urls.regular;
      } else {
        return response.data.results[randomNum].urls.regular;
      }
    } catch (error) {
      console.error(`Failed to get image from Unsplash with error ${error}`);
    }
  };

  return (
    <>
      <div className="projectbox-img">
        <label htmlFor="file-input">
          <div className="img-container">
            {projectImg ? (
              <img src={projectImg} alt="profile" />
            ) : (
              <img src={projectImg} alt="profile" />
            )}
          </div>
        </label>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files![0];
            setProjectImg(URL.createObjectURL(file));
            setImageFile(file);
            uploadImage();
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
            one
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectImg;
