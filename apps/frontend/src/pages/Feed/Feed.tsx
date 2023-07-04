import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectsSidebar from '../../components/Sidebars/ProjectsSidebar';
import Document from '../../components/Documents/Document';
import Spinner from '../../components/Spinner';
import FriendsSidebar from '../../components/Sidebars/FriendsSidebar';
import { timeOfADay } from '../../utils/timeOfDay';
import { useGetFeedPosts } from '../../features/documents/documentsApi';
import { useGetUserFriends } from '../../features/users/friendsApi';
import { useGetAllUserProjects } from '../../features/projects/ProjectsApi';
import { useUser } from '../../axios/useUser';
import './Feed.css';
import ProfileBar from '../../components/Profile/ProfileBar';
import { useGetUserById, useGetAllUsers } from '../../features/users/usersApi';
import QuickProject from '../../components/Project/QuickProject';
import { DocumentResponseDTO } from 'api-client/documents';

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
    data: feedPosts,
    error: feedPostsError,
    isLoading: feedPostsLoading,
    isInitiallyLoading: feedPostsInitiallyLoading,
    mutate: feedPostsMutate,
  } = useGetFeedPosts();

  let feedPostsArray: Array<DocumentResponseDTO> = [];
  feedPostsArray = feedPosts!.data.documents;

  const {
    data: userProjects,
    error: projectsError,
    isLoading: projectsLoading,
    mutate: projectsMutate,
  } = useGetAllUserProjects(id!);

  const {
    data: allUsers,
    error: usersError,
    isLoading: usersLoading,
    isInitiallyLoading: usersInitiallyLoading,
    mutate: usersMutate,
  } = useGetAllUsers();

  if (usersLoading || feedPostsLoading || projectsLoading) {
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
          {feedPostsArray?.map((content) => (
            <Document key={content._id} content={content} />
          ))}
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
