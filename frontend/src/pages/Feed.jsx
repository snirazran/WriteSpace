import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectsSidebar from '../components/Sidebars/ProjectsSidebar';
import Post from '../components/Post';
import FriendsSidebar from '../components/Sidebars/FriendsSidebar';

import './Feed.css';
function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <section className="feed">
      {/* Top Area _ Filter */}

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
        <ProjectsSidebar />

        {/* Main Post Feed */}
        <div className="post-row">
          <Post />
        </div>

        {/* Find Friends sidebar */}
        <FriendsSidebar />
      </div>
    </section>
  );
}

export default Feed;
