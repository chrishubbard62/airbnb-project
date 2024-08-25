// frontend/src/components/Navigation/Navigation.jsx

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
      <ul className='nav'>
        <li>
          <Link  to="/"><img className='logo' src="../../../images/logo.jpg" alt="" /></Link>
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
