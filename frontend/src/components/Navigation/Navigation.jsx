// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
      <ul className='nav'>
        <li>
          <NavLink to="/"><img className='logo' src="../../../images/logo.jpg" alt="" /></NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>


  );
}

export default Navigation;
