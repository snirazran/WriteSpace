import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectItem from './ProjectItem';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';

function Slider({ content }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  let project;
  if (window.location.href.includes('projects/')) {
    project = true;
  }
  if (window.location.href.includes('projects/project/')) {
    project = false;
  }

  const onClick = (id) => {
    if (project) {
      navigate(`/projects/project/${id}`);
    }
    if (!project) {
      navigate(`/posts/${id}`);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="content">
      {content.length > 0 ? (
        <>
          <div className="slider">
            <h1>
              {project
                ? `${
                    content[0].username.charAt(0).toUpperCase() +
                    content[0].username.slice(1)
                  }'s Page`
                : `${
                    content[0].projectName.charAt(0).toUpperCase() +
                    content[0].projectName.slice(1)
                  } Posts`}
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
              {content.map((content) => (
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
            {project
              ? `You have not created any projects yet`
              : `You have not created any posts yet`}
          </h3>
        </div>
      )}
    </div>
  );
}

export default Slider;
