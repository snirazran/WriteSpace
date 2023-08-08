import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectItem from './ProjectItem';
import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.css';
import { Navigation } from 'swiper';
import { GetUserByIdDTO } from 'api-client/users';
import { GetAllUserProjectsDTO, ProjectResponseDTO } from 'api-client/projects';
import { toCapital } from '../../utils/toCapital';

import ProjectGenreSelector from './ProjectGenreSelector';
import { useState } from 'react';
import QuickProjectBtn from '../Buttons/QuickProjectBtn';
import { useAuth } from '../../context/AuthContext';

type SliderProps = {
  content?: GetAllUserProjectsDTO;
  shownUser?: GetUserByIdDTO;
};

const Slider: React.FC<SliderProps> = ({ content, shownUser }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isUserProfile = () => user?._id === shownUser?._id;
  const onClick = (id: string) => {
    navigate(`/projects/project/${id}`);
    window.scrollTo(0, 0);
  };
  const [isSelectorVisible, setSelectorVisible] = useState(false);
  const onBtnClick = () => {
    setSelectorVisible(true);
  };
  if (content) {
    let items: Array<ProjectResponseDTO> = [];
    items = content.projects;

    return (
      <>
        {isSelectorVisible && (
          <ProjectGenreSelector close={() => setSelectorVisible(false)} />
        )}
        {items.length > 0 ? (
          <>
            <div className="slider">
              <div id="profileProjectBtn" className="slider-title">
                <h1>
                  {isUserProfile()
                    ? 'My Projects'
                    : `${toCapital(shownUser?.username!)}'s Projects`}
                </h1>
                {isUserProfile() && (
                  <QuickProjectBtn
                    btnText="Create Project"
                    onClick={onBtnClick}
                  />
                )}
              </div>
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={20}
                navigation={true}
                pagination={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {items.map((content) => (
                  <SwiperSlide
                    key={content._id}
                    onClick={() => {
                      onClick(content._id);
                    }}
                  >
                    <ProjectItem project={content} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        ) : (
          <div className="no-projects">
            <h3>You have not created any projects yet</h3>
            {isUserProfile() && (
              <QuickProjectBtn btnText="Create Project" onClick={onBtnClick} />
            )}
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Slider;
