import { FaHeart, FaComment } from 'react-icons/fa';
import './Post.css';
import friend from '../media/friend.png';

function Post() {
  return (
    <div className="post">
      <div className="post-user">
        <img src={friend} alt="" />
        <div className="post-user-text">
          <h1>Snir Azran</h1>
          <p>Jan 26, 2023</p>
        </div>
      </div>
      <div className="post-content">
        <div className="post-content-title">
          <h1>
            Black & White, <span>short story</span>
          </h1>
        </div>
        <div className="post-content-text">
          <h1>
            Lorem ipsum dolor sit amet consectetur. Sed suspendisse neque augue
            lacus consequat nulla aliquam molestie. Platea blandit auctor nibh
            sit in amet semper. Vulputate vel porta accumsan nulla aliquam
            molestie. Platea blandit auctor nibh sit in amet semper. Vulputate
            vel porta accumsan nulla aliquam molestie.{' '}
          </h1>
        </div>
        <div className="post-content-like">
          <FaHeart className="like" />

          <FaComment className="comment" />
        </div>
        <div className="post-content-comment border ">
          <h1>Liked by Johnny sins and 100 more</h1>
          <p>View all 20 comments</p>
        </div>
      </div>
      <button className="post-content-btn">Read More</button>
    </div>
  );
}

export default Post;
