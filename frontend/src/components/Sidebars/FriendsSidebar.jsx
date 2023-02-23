import friend from '../../media/friend.png';
import friend2 from '../../media/friend2.png';
import friend3 from '../../media/friend3.png';
import friend4 from '../../media/friend4.png';
import './FriendsSidebar.css';

function FriendsSidebar() {
  return (
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
  );
}

export default FriendsSidebar;
