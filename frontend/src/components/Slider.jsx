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
  console.log(content);

  const onClick = (id) => {
    navigate(`/projects/project/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="content">
      {content.length > 0 ? (
        <>
          <div className="slider">
            <h1>
              {content[0].username.charAt(0).toUpperCase() +
                content[0].username.slice(1)}
              's Page
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
        <h3>You have not created any content</h3>
      )}
    </div>
  );
}

export default Slider;
