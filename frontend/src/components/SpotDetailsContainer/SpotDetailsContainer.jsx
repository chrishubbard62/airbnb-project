import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../store/spots";
import ReviewsContainer from "../ReviewsContainer";
import { FaStar } from "react-icons/fa";

import './SpotDetails.css'


function SpotDetailsContainer() {
  const spotDetails = useSelector(state => state.spots)
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = spotDetails[spotId]
  const [newReview, setNewReview] = useState(0);



  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId))
  }, [dispatch, spotId, newReview])
  if (!spot || !spot.SpotImages) return <h2>Loading</h2>

  const handleReserve = () => {
    alert('Feature coming soon')
  }


  const thumbnails = spot.SpotImages.filter((img) => img.preview === false)

  return (
    <div>
      <h2>{spot.name}</h2>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <div className="picture-container">
        <img className='main-pic' src={spot.previewImage} alt={`${spot.name}`} />
        <div className="thumbnail-container">
          {thumbnails.map((img) => {
            return (
              <img className='thumbnail' id={`img${img.id}`} key={img.id} src={img.url} alt={`${spot.name} image ${img.id}`} />
            )
          })}
        </div>
      </div>
      <div className="spot-info">
        <div>
          <p>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</p>
          <p>{spot.description}</p>
        </div>
        <div className="reserve-box">
          <div className="info">
            <p>${spot.price.toFixed(2)}/night</p>
            <p><span><FaStar />{spot.avgRating}</span> · {spot.numReviews === 1 ? `${spot.numReviews} Review` : `${spot.numReviews} Reviews`}</p>
          </div>
          <button onClick={handleReserve}>Reserve</button>
        </div>
      </div>
      <hr className='details-hr'/>
      <ReviewsContainer avgRating={spot.avgRating} ownerId={spot.Owner.id} setNewReview={setNewReview} />
    </div>

  )
}

export default SpotDetailsContainer;
