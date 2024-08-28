import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import {FaStar} from 'react-icons/fa'
import ReviewCard from "./ReivewCard";
function ReviewsContainer({avgRating}) {
  const {spotId} = useParams();
  const data = useSelector(state => state.reviews);
  const dispatch = useDispatch();
  const dataArray = Object.values(data)
  const reviews = dataArray.filter((review) => review.spotId === Number(spotId))




  useEffect(() => {
    dispatch(getReviewsThunk(spotId))
  }, [dispatch, spotId])

  return (
    <div className="Review-container">
      <h2><FaStar/>{avgRating} · {reviews.length + `${reviews.length === 1 ? ' review': ' reviews'}`}</h2>
      <ReviewCard />
    </div>
  )
}

export default ReviewsContainer;
