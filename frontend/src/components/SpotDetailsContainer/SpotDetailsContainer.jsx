import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../store/spots";
import ReviewsContainer from "../ReviewsContainer";
import { FaStar } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton";
import { useNavigate } from "react-router-dom";
import './SpotDetails.css'
import BookingModal from "../BookingModal";


function SpotDetailsContainer() {
  const spotDetails = useSelector(state => state.spots)
  const reviews = useSelector(state => state.reviews)
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = spotDetails[spotId]
  const [newReview, setNewReview] = useState(0);
  const [BookingRedirect, setBookingBookingRedirect] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId))
  }, [dispatch, spotId, newReview, reviews])

  useEffect(()=> {
    if(BookingRedirect) {
      navigate('/bookings/current')
    }
  }, [BookingRedirect, navigate])

  if (!spot || !spot.SpotImages) return <h2>Loading</h2>

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
            <p><span><FaStar />{spot.avgRating !== 'NEW!' ? spot.avgRating.toFixed(1) : 'NEW!'}</span>{spot.numReviews > 0 && <span> · {`${spot.numReviews}` + `${spot.numReviews === 1 ? ' review' : ' reviews'}`}</span>} </p>
          </div>
          <OpenModalButton
            buttonText={'Reserve'}
            modalComponent={<BookingModal spotId={spotId} book={setBookingBookingRedirect}/>}
          />
        </div>
      </div>
      <hr className='details-hr'/>
      <ReviewsContainer avgRating={spot.avgRating} ownerId={spot.Owner.id} setNewReview={setNewReview}/>
    </div>

  )
}

export default SpotDetailsContainer;
