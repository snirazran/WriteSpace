import { Link, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectItem from './ProjectItem';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';
import { checkIfProject } from '../utils/checkIfProject';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Project } from '../utils/project';

import { GetUserByIdDTO } from 'api-client/users';
import { GetAllUserProjectsDTO } from 'api-client/projects';
import { toCapital } from '../utils/toCapital';
import { ProjectInfo } from '../types/projectsType';

type ProjectGenreSelectorProps = {
  content?: GetAllUserProjectsDTO;
  shownUser?: GetUserByIdDTO;
};

const Slider: React.FC<ProjectGenreSelectorProps> = ({
  content,
  shownUser,
}) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const isProject = checkIfProject();
  let projects = content?.projects as unknown as ProjectInfo[];

  const onClick = (id: string) => {
    if (isProject) {
      navigate(`/projects/project/${id}`);
    }
    if (!isProject) {
      navigate(`/posts/${id}`);
    }
    window.scrollTo(0, 0);
  };

  if (content) {
    return (
      <div className="content">
        {projects.length > 0 ? (
          <>
            <div className="slider">
              <h1>
                {isProject
                  ? `${toCapital(shownUser ? shownUser?.username : '')}'s Page`
                  : `${toCapital(projects[0].name)} Posts`}
              </h1>
              <Swiper
                effect={'coverflow'}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={120}
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 20,
                  modifier: 1,
                  slideShadows: false,
                }}
                navigation={true}
                pagination={true}
                modules={[EffectCoverflow, Navigation, Pagination]}
                className="mySwiper"
              >
                {projects.map((content) => (
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
            <h3>
              {isProject
                ? `You have not created any projects yet`
                : `You have not created any posts yet`}
            </h3>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Slider;
