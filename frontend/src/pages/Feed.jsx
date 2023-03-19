import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectsSidebar from '../components/Sidebars/ProjectsSidebar';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import FriendsSidebar from '../components/Sidebars/FriendsSidebar';
import { getFeedPosts, resetPosts } from '../features/posts/postSlice';
import { getProjects, resetProjects } from '../features/projects/projectSlice';
import { getUserFriends, resetUser } from '../features/users/userSlice';

import './Feed.css';
function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Get the states

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { projects, projectIsLoading, projectIsError, projectMessage } =
    useSelector((state) => state.projects);
  const { posts, postIsLoading, postIsError, postMessage } = useSelector(
    (state) => state.posts
  );

  // get the id
  const id = user._id;

  //get the local time
  let hour;
  const now = new Date();
  if (now.getHours() >= 5 && now.getHours() < 12) {
    hour = 'Morning';
  }
  if (now.getHours() >= 12 && now.getHours() < 17) {
    hour = 'Afternoon';
  }
  if (now.getHours() >= 17 && now.getHours() < 21) {
    hour = 'Evening';
  }
  if (now.getHours() >= 21 && now.getHours() <= 23) {
    hour = 'Night';
  }
  if (now.getHours() >= 0 && now.getHours() <= 4) {
    hour = 'Night';
  }

  useEffect(() => {
    if (isError || projectIsError || postIsError) {
      console.log(projectMessage || postMessage || message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getFeedPosts());
    dispatch(getProjects(id));
    dispatch(getUserFriends(id));

    return () => {
      dispatch(resetPosts());
      dispatch(resetProjects());
      dispatch(resetUser());
    };
  }, [
    user,
    dispatch,
    postIsError,
    id,
    projectIsError,
    isError,
    navigate,
    message,
    postMessage,
    projectMessage,
  ]);

  if ((isLoading, postIsLoading, projectIsLoading)) {
    return <Spinner />;
  }

  return (
    <section className="feed">
      {/* Top Area _ Filter */}

      <div className="top-text">
        <h1>
          Good {hour} {user.username.split(' ')[0]},
        </h1>
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

        {<ProjectsSidebar content={projects} />}

        {/* Main Post Feed */}
        <div className="post-row">
          {posts.map((content) => (
            <Post key={content._id} content={content} />
          ))}
        </div>

        {/* Find Friends sidebar */}
        <FriendsSidebar content={user} />
      </div>
    </section>
  );
}

export default Feed;
