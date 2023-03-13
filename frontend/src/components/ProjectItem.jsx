import { SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom';

function ProjectItem({ project }) {
  const navigate = useNavigate();

  return (
    <div className="box">
      <img src={project.img} alt="" />
      <div className="box-text ">
        <h1>{project.name}</h1>
        <p>{project.genre || project.type}</p>
      </div>
    </div>
  );
}

export default ProjectItem;
