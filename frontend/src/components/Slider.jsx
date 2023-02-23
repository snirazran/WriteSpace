import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import projectImg from '../media/projectbigimg.png';
import projectImg2 from '../media/projectbigimg2.png';
import projectImg3 from '../media/projectbigimg3.png';
import projectImg4 from '../media/projectbigimg4.png';

function Slider() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/project/page');
    window.scrollTo(0, 0);
  };

  return (
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
        <SwiperSlide onClick={onClick}>
          <div className="box">
            <img src={projectImg} alt="" />
            <div className="box-text ">
              <h1>Grow Yourself</h1>
              <p>Book</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={onClick}>
          <div className="box">
            <img src={projectImg2} alt="" />
            <div className="box-text">
              <h1>I'm a banana</h1>
              <p>Book</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={onClick}>
          <div className="box">
            <img src={projectImg3} alt="" />
            <div className="box-text">
              <h1>Find Love</h1>
              <p>Book</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={onClick}>
          <div className="box">
            <img src={projectImg4} alt="" />
            <div className="box-text">
              <h1>What Is Love</h1>
              <p>Book</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
