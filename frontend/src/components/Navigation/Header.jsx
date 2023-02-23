import { useRef } from 'react';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import Logo from '../../media/Logo.png';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const onClick = () => {
    navRef.current.classList.remove('responsive_nav');
  };
  return (
    <header className="header">
      <button className="nav-btn nav-login-btn">
        <Link onClick={onClick} to="/login">
          <FaUser />
        </Link>
      </button>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <nav ref={navRef}>
        <ul>
          {user ? (
            <>
              <li>
                <Link onClick={onClick} className=" " to="/">
                  Explore
                </Link>
              </li>
              <li>
                <Link onClick={onClick} className=" " to="/projects">
                  My Projects
                </Link>
              </li>
              <li>
                <button className="circled" onClick={onLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link onClick={onClick} className="login" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link onClick={onClick} className="circled" to="/register">
                  Sign Up
                </Link>
              </li>
            </>
          )}

          <button className="nav-btn nav-close-btn" onClick={showNavBar}>
            <FaTimes />
          </button>
        </ul>
      </nav>
      <button className="nav-btn" onClick={showNavBar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Header;
