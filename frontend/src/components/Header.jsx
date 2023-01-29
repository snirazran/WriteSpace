import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">WriteSpace</Link>
      </div>

      <ul>
        <li>
          <Link className="login" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="signup" to="/register">
            Sign Up
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
