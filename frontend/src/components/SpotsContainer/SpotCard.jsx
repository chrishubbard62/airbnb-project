import './SpotCard.css'
import { Link } from 'react-router-dom'

function SpotCard({spot}) {
  return (
    <Link to={`/${spot.id}`} className="spot-card">
      <img className='spot-card-image' src={spot.previewImage} alt={`${spot.description}`}/>
      <div className='state-stars'>
        <div>{spot.city}, {spot.state}</div>
        <div>{spot.avgRating}</div>
      </div>
      <div>{spot.price.toFixed(2)}</div>
    </Link>
  )

}
export default SpotCard
