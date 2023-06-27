import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectsSidebar from '../../components/Sidebars/ProjectsSidebar';
import Document from '../../components/Documents/Document';
import Spinner from '../../components/Spinner';
import FriendsSidebar from '../../components/Sidebars/FriendsSidebar';
import { getFeedPosts, resetPosts } from '../../features/posts/postSlice';
import {
  getProjects,
  resetProjects,
} from '../../features/projects/projectSlice';
import { timeOfADay } from '../../utils/timeOfDay';

import { useGetUserFriends } from '../../features/users/friendsApi';
import { useUser } from '../../axios/useUser';
import './Feed.css';
import ProfileBar from '../../components/Profile/ProfileBar';
import { useGetUserById, useGetAllUsers } from '../../features/users/usersApi';
import QuickProject from '../../components/Project/QuickProject';
function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, setUser } = useAuth();

  // get the id
  const id = user?._id;
  //get the local time
  const hour = timeOfADay();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const {
    data: users,
    error,
    isLoading: usersLoading,
    isInitiallyLoading,
    mutate,
  } = useGetAllUsers();

  if (usersLoading) {
    return <Spinner />;
  }

  return (
    <section className="feed">
      {/* Main Area _ Main feed + side bars */}

      <div className="main-feed">
        <div className="side-bars">
          {/* profile sidebar */}
          <ProfileBar user={user} />
          <Link to={`/profile/edit`}>Edit Profile</Link>
          <Link to={`/profile/647fa634fc96f161098cab4d`}>User Profile</Link>
          {/* Your-projects side bar */}

          {/* {<ProjectsSidebar content={projects} />} */}
        </div>

        {/* Main Post Feed */}
        <div className="post-row">
          {/* Top Area _ Filter */}

          <div className="top-text">
            <h1>
              Good {hour} {user ? user.username.split(' ')[0] : 'user'},
            </h1>
            <div className="selector">
              <label htmlFor="sort">Sort by: </label>
              <select name="sort" id="sort">
                <option value="new">New</option>
                <option value="old">Old</option>
                <option value="most-liked">Most Liked</option>
              </select>
            </div>
          </div>

          {/* Quick post section */}
          <QuickProject />
          {/* {posts.map((content) => (
            <Post key={content._id} content={content} />
          ))} */}
        </div>
        <div className="side-bars">
          {/* Find Friends sidebar */}
          {/* <FriendsSidebar
            user={user}
            // userFriends={userFriends}
            // content={userList}
            addRemoveFriend={addRemoveFriend}
            setFriends={setFriends}
          /> */}
        </div>
      </div>
    </section>
  );
}

export default Feed;
