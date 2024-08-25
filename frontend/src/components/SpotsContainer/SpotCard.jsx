import './SpotCard.css'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";

function SpotCard({spot}) {
  return (
    <Link to={`/${spot.id}`} className="spot-card">
      <img className='spot-card-image' src={spot.previewImage} alt={`${spot.description}`}/>
      <span className='tool-tip'>{spot.name}</span>
      <div className='state-stars'>
        <div>{spot.city}, {spot.state}</div>
        <div>{spot.avgRating !== 'NEW!' && <FaStar className='star'/>}{spot.avgRating}</div>
      </div>
      <div className='price'>${spot.price.toFixed(2)}/Night</div>
    </Link>
  )

}
export default SpotCard
