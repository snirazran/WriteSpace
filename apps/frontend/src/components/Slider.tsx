import { Link, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectItem from './Project/ProjectItem';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';
import { checkIfProject } from '../utils/checkIfProject';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Project } from '../utils/project';

import { GetUserByIdDTO } from 'api-client/users';
import { GetAllUserProjectsDTO, ProjectResponseDTO } from 'api-client/projects';
import { toCapital } from '../utils/toCapital';

import {
  DocumentResponseDTO,
  GetAllProjectDocumentsDTO,
} from 'api-client/documents';

type ProjectGenreSelectorProps = {
  content?: GetAllUserProjectsDTO | GetAllProjectDocumentsDTO;
  shownUser?: GetUserByIdDTO;
};

const Slider: React.FC<ProjectGenreSelectorProps> = ({
  content,
  shownUser,
}) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const isProject = checkIfProject();

  const onClick = (id: string) => {
    if (isProject) {
      navigate(`/projects/project/${id}`);
    }
    if (!isProject) {
      navigate(`/document/${id}`);
    }
    window.scrollTo(0, 0);
  };

  if (content) {
    let items: Array<DocumentResponseDTO | ProjectResponseDTO> = [];

    if ('projects' in content) {
      items = content.projects;
    } else if ('documents' in content) {
      items = content.documents;
    }
    return (
      <div className="content">
        {items.length > 0 ? (
          <>
            <div className="slider">
              <h1>
                {/* {isProject
                  ? `${toCapital(shownUser ? shownUser?.username : '')}'s Page`
                  : `${toCapital(content[0].name)} Posts`} */}
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
