import { FaHeart, FaComment } from 'react-icons/fa';
import authorPhoto from '../media/friend.png';
import './ScribbleBox.css';

function ScribbleBox() {
  return (
    <section className="scribble-box">
      <div className="author">
        <img src={authorPhoto} alt="" />
        <div className="author-text">
          <h1>Snir Azran</h1>
          <p>Jan 26, 2023</p>
        </div>
      </div>
      <div className="title">
        <h1>
          But Also A Water Melon, <span>story-chapter</span>
        </h1>
      </div>
      <div className="content">
        <p>
          Let’s take a look at the “Roboto” and “San Francisco” typefaces (the
          first one is used in Material Design and the second one in Apple’s
          ecosystem). Headlines from 20 to 48 pixels have either a positive
          letter-spacing value or none. If the font size is bigger,
          letter-spacing becomes negative. These exact numbers are not going to
          work that well for other typefaces, but after trying different
          approaches I can state that it’s a common pattern. I’ve tested several
          guidelines for letter-spacing and the one that was published by Bazen
          Agency works for a lot of popular typefaces. It will be a good
          starting point for you, but you can always apply additional
          adjustments:
        </p>
      </div>
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

export default ScribbleBox;
