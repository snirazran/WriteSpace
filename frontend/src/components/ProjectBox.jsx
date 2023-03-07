import './ProjectBox.css';
import SecondaryBtn from './Buttons/SecondaryBtn';

function ProjectBox({ content }) {
  return (
    <div className="project-box">
      <div className="project-details">
        <img src={content.img} alt="" />
        <h1>{content.name}</h1>
      </div>
      <div className="author-details">
        <p>
          <span>{content.genre} </span>By {content.username}
        </p>
        <img src={content.userImg} alt="" />
      </div>
      <div className="project-description">
        <p>{content.description}</p>
      </div>
      <SecondaryBtn id="project-btn" btnText={'Edit project'} />
    </div>
  );
}

export default ProjectBox;
