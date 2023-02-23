import projectImg from '../../media/projectimg.png';
import projectImg2 from '../../media/projectimg2.png';
import projectImg3 from '../../media/projectimg3.png';
import './ProjectsSidebar.css';

function ProjectsSidebar() {
  return (
    <div className="sidebar your-projects">
      <h1>Your Projects</h1>
      <div className="sidebar-row">
        <img src={projectImg} alt="" />
        <div className="sidebar-text">
          <h1>Where Am I</h1>
          <p>Screen-Play</p>
        </div>
        <button className="sidebar-btn projects-btn">Edit</button>
      </div>
      <div className="sidebar-row">
        <img src={projectImg2} alt="" />
        <div className="sidebar-text">
          <h1>Black & White</h1>
          <p>Short Story</p>
        </div>
        <button className="sidebar-btn projects-btn">Edit</button>
      </div>
      <div className="sidebar-row">
        <img src={projectImg3} alt="" />
        <div className="sidebar-text">
          <h1>{`I’m a banana`}</h1>
          <p>Poem</p>
        </div>
        <button className="sidebar-btn projects-btn">Edit</button>
      </div>
    </div>
  );
}

export default ProjectsSidebar;
