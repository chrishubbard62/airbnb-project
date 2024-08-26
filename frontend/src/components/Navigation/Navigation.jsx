// frontend/src/components/Navigation/Navigation.jsx

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
      <ul className='nav'>
        <li className='logo-container'>
          <Link  to="/"><img className='logo' src="../../../images/logo.jpg" alt="" />BNB</Link>
        </li>
        {isLoaded && (
          <div className='right-nav'>
            {sessionUser && <li id='create'><Link to='/spots/new'>Create a New Spot</Link></li>}
            <li>
            <ProfileButton user={sessionUser} />
            </li>
          </div>

        )}
      </ul>


  );
}

export default Navigation;
