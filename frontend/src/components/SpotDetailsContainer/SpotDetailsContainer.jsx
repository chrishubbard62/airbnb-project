import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../store/spots";
import ReviewsContainer from "../ReviewsContainer";
import { FaStar } from "react-icons/fa";


function SpotDetailsContainer() {
  const spotDetails = useSelector(state => state.spots)
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const spot = spotDetails[spotId]


  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId))
  }, [dispatch, spotId])
  if(!spot || !spot.SpotImages) return <h2>Loading</h2>


  const thumbnails = spot.SpotImages.filter((img) => img.preview === false)

  return (
    <div>
      <h2>{spot.name}</h2>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <img style={{width: 500}} src={spot.previewImage} alt={`${spot.name}`} />
      {thumbnails.map((img) => {
        return (
          <img className='thumbnail' style={{width: 100}}key={img.id} src={img.url} alt={`${spot.name} image ${img.id}`}/>
        )
      })}
      <p>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</p>
      <p>{spot.description}</p>
      <p><FaStar />{spot.avgRating}</p>
      <p>${spot.price.toFixed(2)}/night</p>
      <p>{spot.numReviews === 1 ? `${spot.numReviews} Review`: `${spot.numReviews} Reviews`}</p>
      <button>Reserve</button>
      <hr />
      <ReviewsContainer avgRating={spot.avgRating} ownerId={spot.Owner.id}/>
    </div>

  )
}

export default SpotDetailsContainer;
