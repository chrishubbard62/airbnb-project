import './SpotCard.css'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton'
import DeleteModal from '../DeleteModal';

function SpotCard(props) {
  const { spot, current, spotId } = props;
  const navigate = useNavigate();

  const handleUpdate = () => navigate(`/spots/${spot.id}/edit`)



  return (
    <div>
      <Link to={`/${spot.id}`} className="spot-card">
        <img className='spot-card-image' src={spot.previewImage} alt={`${spot.description}`} />
        <span className='tool-tip'>{spot.name}</span>
        <div className='state-stars'>
          <div>{spot.city}, {spot.state}</div>
          {/* <div>{spot.avgRating !== 'NEW!' && <FaStar className='star'/>}{spot.avgRating}</div> */}
          <div><FaStar></FaStar>{spot.avgRating !== 'NEW!' ? `${spot.avgRating.toFixed(1)}` : 'NEW!'}</div>
        </div>
        <div className='price'>${spot.price.toFixed(2)}/Night</div>
      </Link>
      {current &&
      <div className='button-box'>
       <button className='update-delete' onClick={handleUpdate}>Update</button>
       <OpenModalButton className='update-delete'
        modalComponent={<DeleteModal spotId={spotId} deleteType={'spot'}/>}
        buttonText={'Delete'}
        />
      </div>
      }
    </div>

  )

}
export default SpotCard
