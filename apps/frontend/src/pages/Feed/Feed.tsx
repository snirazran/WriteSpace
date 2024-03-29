import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectsSidebar from '../../components/Sidebars/ProjectsSidebar';
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
import { GetAllUserProjectsDTO, ProjectResponseDTO } from 'api-client/projects';

function Feed() {
  const navigate = useNavigate();
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
  } = useGetAllUserProjects(id!, { refreshInterval: 5000, errorRetryCount: 5 });

  const {
    data: userFriends,
    error: friendsError,
    isLoading: isFriendsLoading,
    isValidating: isFriendsInitiallyLoading,
    mutate: friendsMutate,
  } = useGetUserFriends(id!, { refreshInterval: 5000, errorRetryCount: 5 });

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
  } = useGetAllUsers({ refreshInterval: 5000, errorRetryCount: 5 });

  if (usersLoading || projectsLoading) {
    return <Spinner />;
  }

  return (
    <section className="feed">
      {/* Main Area _ Main feed + side bars */}

      <div className="main-feed">
        <div className="side-bars" id="left-sidebar">
          {/* profile sidebar */}
          <ProfileBar
            friendsMutate={friendsMutate}
            usersMutate={usersMutate}
            userFriends={friendsArray}
            userProjects={userProjects?.data}
            user={user}
          />

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
          </div>

          {/* Quick post section */}
          <QuickProject />
          {/* Main Feed */}
          <FeedDocuments user={user} />
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
