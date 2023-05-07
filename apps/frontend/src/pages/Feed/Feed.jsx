import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAxios } from '../../context/AxiosContext';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectsSidebar from '../../components/Sidebars/ProjectsSidebar';
import Post from '../../components/Post';
import Spinner from '../../components/Spinner';
import FriendsSidebar from '../../components/Sidebars/FriendsSidebar';
import QuickPost from '../../components/QuickPost';
import { getFeedPosts, resetPosts } from '../../features/posts/postSlice';
import {
  getProjects,
  resetProjects,
} from '../../features/projects/projectSlice';
import { setFriends } from '../../features/auth/authSlice';
import { timeOfADay } from '../../utils/timeOfDay';
import {
  getUserFriends,
  getAllUsers,
  resetUser,
  addRemoveFriend,
} from '../../features/users/userSlice';
import { useUser } from '../../axios/useUser';
import './Feed.css';
import ProfileBar from '../../components/ProfileBar';
import { useGetUserById, useGetAllUsers } from '../../features/users/usersApi';
function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, setUser } = useAuth();

  //Get the states

  // const { user, isLoading, isError, message } = useSelector(
  //   (state) => state.auth
  // );
  const { projects, projectIsLoading, projectIsError, projectMessage } =
    useSelector((state) => state.projects);
  const { posts, postIsLoading, postIsError, postMessage } = useSelector(
    (state) => state.posts
  );
  const { userList, userFriends, userIsLoading, userIsError, userMessage } =
    useSelector((state) => state.user);

  // get the id
  let id;
  //get the local time
  const hour = timeOfADay();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // useEffect(() => {
  //   if (isError || projectIsError || postIsError || userIsError) {
  //     console.log(projectMessage || postMessage || message || userMessage);
  //   }
  //   if (!user) {
  //     navigate('/register');
  //   }
  //   if (user) {
  //     dispatch(getFeedPosts());
  //     dispatch(getProjects(user._id));
  //     dispatch(getUserFriends(user._id));
  //     dispatch(getAllUsers(user._id));
  //   }
  //   return () => {
  //     dispatch(resetPosts());
  //     dispatch(resetProjects());
  //     dispatch(resetUser());
  //   };
  // }, [
  //   user,
  //   dispatch,
  //   postIsError,
  //   id,
  //   projectIsError,
  //   isError,
  //   userMessage,
  //   userIsError,
  //   navigate,
  //   message,
  //   postMessage,
  //   projectMessage,
  // ]);

  // if (isLoading || postIsLoading || projectIsLoading || userIsLoading) {
  //   return <Spinner />;
  // }

  return (
    <section className="feed">
      {/* Main Area _ Main feed + side bars */}

      <div className="main-feed">
        <div className="side-bars">
          {/* profile sidebar */}
          <ProfileBar user={user} />
          {/* Your-projects side bar */}

          {<ProjectsSidebar content={projects} />}
        </div>

        {/* Main Post Feed */}
        <div className="post-row">
          {/* Top Area _ Filter */}

          <div className="top-text">
            <h1>
              Good {hour} {user ? user.username.split(' ')[0] : 'user'},
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

          {/* Quick post section */}
          <QuickPost />
          {posts.map((content) => (
            <Post key={content._id} content={content} />
          ))}
        </div>
        <div className="side-bars">
          {/* Find Friends sidebar */}
          <FriendsSidebar
            user={user}
            userFriends={userFriends}
            content={userList}
            addRemoveFriend={addRemoveFriend}
            setFriends={setFriends}
          />
        </div>
      </div>
    </section>
  );
}

export default Feed;
