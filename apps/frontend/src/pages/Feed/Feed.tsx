import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectsSidebar from '../../components/Sidebars/ProjectsSidebar';
import Document from '../../components/Documents/Document';
import Spinner from '../../components/Spinner';
import FriendsSidebar from '../../components/Sidebars/FriendsSidebar';
import { timeOfADay } from '../../utils/timeOfDay';
import { useGetUserFriends } from '../../features/users/friendsApi';
import { useGetAllUserProjects } from '../../features/projects/ProjectsApi';
import './Feed.css';
import ProfileBar from '../../components/Profile/ProfileBar';
import { useGetAllUsers } from '../../features/users/usersApi';
import QuickProject from '../../components/Project/QuickProject';
import { UserResponseDTO } from 'api-client/users';
import FeedDocuments from '../../components/Documents/FeedDocuments';

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
    data: userProjects,
    error: projectsError,
    isLoading: projectsLoading,
    mutate: projectsMutate,
  } = useGetAllUserProjects(id!);

  const {
    data: userFriends,
    error: friendsError,
    isLoading: isFriendsLoading,
    isValidating: isFriendsInitiallyLoading,
    mutate: friendsMutate,
  } = useGetUserFriends(id!);

  let friendsArray: Array<UserResponseDTO> = [];
  if (userFriends) {
    friendsArray = userFriends.data.userFriends;
  }

  const {
    data: allUsers,
    error: usersError,
    isLoading: usersLoading,
    isInitiallyLoading: usersInitiallyLoading,
    mutate: usersMutate,
  } = useGetAllUsers();

  if (usersLoading || projectsLoading) {
    return <Spinner />;
  }

  return (
    <section className="feed">
      {/* Main Area _ Main feed + side bars */}

      <div className="main-feed">
        <div className="side-bars">
          {/* profile sidebar */}
          <ProfileBar userFriends={friendsArray} user={user} />

          {/* Your-projects side bar */}
          {<ProjectsSidebar content={userProjects?.data} />}
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
          {/* Main Feed */}
          <FeedDocuments />
        </div>
        <div className="side-bars">
          {/* Find Friends sidebar */}
          <FriendsSidebar
            user={user}
            userFriends={friendsArray}
            usersMutate={usersMutate}
            friendsMutate={friendsMutate}
            content={allUsers?.data}
          />
        </div>
      </div>
    </section>
  );
}

export default Feed;
