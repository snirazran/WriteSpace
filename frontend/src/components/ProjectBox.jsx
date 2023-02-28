import './ProjectBox.css';
import projectPhoto from '../media/projectphoto.png';
import userPhoto from '../media/friend.png';
import SecondaryBtn from './Buttons/SecondaryBtn';

function ProjectBox({ author }) {
  return (
    <div className="project-box">
      <div className="project-details">
        <img src={projectPhoto} alt="" />
        <h1>I’m A Banana</h1>
      </div>
      <div className="author-details">
        <p>
          <span>Short-Story </span> {author}
        </p>
        <img src={userPhoto} alt="" />
      </div>
      <div className="project-description">
        <p>
          Lorem ipsum dolor sit amet consectetur. Parturient orci purus proin
          volutpat tortor. Enim at sed habitasse quis odio gravida augue diam.
          Dis donec massa vel pharetra porttitor in elementum dui.
        </p>
      </div>
      <SecondaryBtn id="project-btn" btnText={'Edit project'} />
    </div>
  );
}

export default ProjectBox;
