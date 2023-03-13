import { FaHeart, FaComment } from 'react-icons/fa';
import authorPhoto from '../media/friend.png';
import './PostBox.css';
import 'quill/dist/quill.snow.css';

function PostBox({ content }) {
  const date = new Date(content.createdAt);
  if (content) {
    return (
      <section className="scribble-box">
        <div className="author">
          <img src={content.userImg} alt="" />
          <div className="author-text">
            <h1>{content.username}</h1>
            <p>{date.toLocaleDateString('en-US')}</p>
          </div>
        </div>
        <div className="title">
          <h1>
            {`${content.name},`}
            <span> {content.type}</span>
          </h1>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: content.content }}
          className="ql-editor"
          id="post-content"
        ></div>
        <div className="like-comment">
          <div className="icons">
            <FaHeart className="like-icon" />
            <FaComment className="comment-icon" />
          </div>
          <div className="like-text">
            <h1>Liked by Johnny sins and 100 more</h1>
          </div>
          <div className="comment-text">
            <p>View all 20 comments</p>
          </div>
        </div>
      </section>
    );
  }
}

export default PostBox;
