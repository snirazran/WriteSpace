import { FaSearch, FaHeart, FaComment } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import projectImg from '../media/projectimg.png';
import projectImg2 from '../media/projectimg2.png';
import projectImg3 from '../media/projectimg3.png';
import friend from '../media/friend.png';
import friend2 from '../media/friend2.png';
import friend3 from '../media/friend3.png';
import friend4 from '../media/friend4.png';
function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  return (
    <section className="feed">
      {/* Top Area _ Search/Filter */}

      <div className="search">
        <input type="text" placeholder="Find friends and projects" />
        <FaSearch />
      </div>
      <div className="top-text">
        <h1>Good Evening {user ? user.name : 'User'},</h1>
        <div className="selector">
          <label for="sort">Sort by: </label>
          <select name="sort" id="sort">
            <option value="new">New</option>

            <option value="old">Old</option>

            <option value="most-liked">Most Liked</option>
          </select>
        </div>
      </div>

      {/* Main Area _ Main feed + side bars */}

      <div className="main-feed">
        {/* Your-projects side bar */}

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
              <h1>I’m a banana</h1>
              <p>Poem</p>
            </div>
            <button className="sidebar-btn projects-btn">Edit</button>
          </div>
        </div>

        {/* Main Post Feed */}
        <div className="post-row">
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
                  Lorem ipsum dolor sit amet consectetur. Sed suspendisse neque
                  augue lacus consequat nulla aliquam molestie. Platea blandit
                  auctor nibh sit in amet semper. Vulputate vel porta accumsan
                  nulla aliquam molestie. Platea blandit auctor nibh sit in amet
                  semper. Vulputate vel porta accumsan nulla aliquam molestie.{' '}
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
                  Lorem ipsum dolor sit amet consectetur. Sed suspendisse neque
                  augue lacus consequat nulla aliquam molestie. Platea blandit
                  auctor nibh sit in amet semper. Vulputate vel porta accumsan
                  nulla aliquam molestie. Platea blandit auctor nibh sit in amet
                  semper. Vulputate vel porta accumsan nulla aliquam molestie.{' '}
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
        </div>

        {/* Find Friends sidebar */}
        <div className="sidebar find-friends">
          <h1>Discover new friends</h1>
          <div className="sidebar-row">
            <img src={friend} alt="" />
            <div className="sidebar-text">
              <h1>Kostia Ondrin</h1>
            </div>
            <button className="sidebar-btn friends-btn">Add Friend</button>
          </div>
          <div className="sidebar-row">
            <img src={friend2} alt="" />
            <div className="sidebar-text">
              <h1>Carmel Moalem</h1>
            </div>
            <button className="sidebar-btn friends-btn">Add Friend</button>
          </div>
          <div className="sidebar-row">
            <img src={friend3} alt="" />
            <div className="sidebar-text">
              <h1>Tal Bokobza</h1>
            </div>
            <button className="sidebar-btn friends-btn">Add Friend</button>
          </div>
          <div className="sidebar-row">
            <img src={friend4} alt="" />
            <div className="sidebar-text">
              <h1>Adir Amidi</h1>
            </div>
            <button className="sidebar-btn friends-btn">Add Friend</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feed;
