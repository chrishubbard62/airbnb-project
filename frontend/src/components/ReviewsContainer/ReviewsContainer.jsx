import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import {FaStar} from 'react-icons/fa'
import ReviewCard from "./ReviewCard";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";


function ReviewsContainer({avgRating, ownerId, setNewReview}) {
  const {spotId} = useParams();
  const session = useSelector(state => state.session)
  const data = useSelector(state => state.reviews);
  const dispatch = useDispatch();
  const dataArray = Object.values(data)
  const reviews = dataArray.filter((review) => review.spotId === Number(spotId))
  reviews.reverse();

useEffect(() => {
    dispatch(getReviewsThunk(spotId))
  }, [dispatch, spotId])



if(!data) return <h2>Loading</h2>

  return (
    <div className="Review-container">
      <h2><FaStar/>{avgRating} · {reviews.length + `${reviews.length === 1 ? ' review': ' reviews'}`}</h2>

      {session.user &&
        session.user?.id !== ownerId &&
        !reviews?.some((review) => review?.userId=== session.user?.id) &&
        <OpenModalButton
          modalComponent={<ReviewFormModal spotId={spotId} setNewReview={setNewReview}/>}
          buttonText={'Post Your Review'}
        />}
      {reviews.map((review) =>
      <ReviewCard
        key={review.id}
        review={review}
      />
      )}
    </div>
  )
}

export default ReviewsContainer;
