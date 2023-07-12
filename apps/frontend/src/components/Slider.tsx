import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectItem from './Project/ProjectItem';
import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.css';
import { Navigation } from 'swiper';
import { GetUserByIdDTO } from 'api-client/users';
import { GetAllUserProjectsDTO, ProjectResponseDTO } from 'api-client/projects';
import { toCapital } from '../utils/toCapital';

type ProjectGenreSelectorProps = {
  content?: GetAllUserProjectsDTO;
  shownUser?: GetUserByIdDTO;
};

const Slider: React.FC<ProjectGenreSelectorProps> = ({
  content,
  shownUser,
}) => {
  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/projects/project/${id}`);
    window.scrollTo(0, 0);
  };

  if (content) {
    let items: Array<ProjectResponseDTO> = [];
    items = content.projects;
    return (
      <>
        {items.length > 0 ? (
          <>
            <div className="slider">
              <div className="slider-title">
                <h1>{`${toCapital(shownUser?.username!)}'s Projects`}</h1>
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
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Slider;
