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

function Slider({ projects }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onClick = (id) => {
    navigate(`/project/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="content">
      {projects.length > 0 ? (
        <>
          <div className="slider">
            <h1>My Projects</h1>
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
              {projects.map((project) => (
                <SwiperSlide
                  key={project._id}
                  onClick={() => {
                    onClick(project._id);
                  }}
                >
                  <ProjectItem project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <h3>You have not set any projects</h3>
      )}
    </div>
  );
}

export default Slider;
