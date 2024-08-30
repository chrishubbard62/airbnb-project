import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import {FaStar} from 'react-icons/fa'
import ReviewCard from "./ReviewCard";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import './Review.css'


function ReviewsContainer({avgRating, ownerId, setNewReview, deleted, setDeleted}) {
  const {spotId} = useParams();
  const session = useSelector(state => state.session)
  const data = useSelector(state => state.reviews);
  const dispatch = useDispatch();
  const dataArray = Object.values(data)
  const reviews = dataArray.filter((review) => review.spotId === Number(spotId))
  reviews.reverse();

useEffect(() => {
  console.log('i rerendered')
    dispatch(getReviewsThunk(spotId))
  }, [dispatch, spotId, deleted])



if(!data) return <h2>Loading</h2>

  return (
    <div className="review-container">
      <h2><FaStar/>{avgRating} · {reviews.length + `${reviews.length === 1 ? ' review': ' reviews'}`}</h2>
      {
        session.user &&
        session.user?.id !== ownerId &&
        !reviews?.length && <p>Be the first to post a review!</p>
      }
      {session.user &&
        session.user?.id !== ownerId &&
        !reviews?.some((review) => review?.userId=== session.user?.id) &&
        <OpenModalButton className='post-review-button'
          modalComponent={<ReviewFormModal spotId={spotId} setNewReview={setNewReview}/>}
          buttonText={'Post Your Review'}
        />}
      {reviews.map((review) =>
      <ReviewCard
        key={review.id}
        review={review}
        setDeleted={setDeleted}
      />
      )}
    </div>
  )
}

export default ReviewsContainer;
