import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

import './ReviewForm.css'

function ReviewFormModal({spotId, setNewReview}) {
  const session = useSelector(state => state.session)
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)
  const [valErrors, setValErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const {closeModal} = useModal();
  const dispatch = useDispatch();
  const [activeRating, setActiveRating] = useState(0)





  useEffect(() => {
    const errors = {}
    if(review.length < 1) errors.review = 'Review must have text'
    if(stars < 1 || stars > 5) errors.stars = 'stars must be between 1 and 5'
    setValErrors(errors)
  }, [review, stars])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    if(Object.values(valErrors).length) {
      return;
    }
    const newReview = {
      review,
      stars
    }
    await dispatch(createReviewThunk(session.user, spotId, newReview))
    setNewReview((prev) => prev + 1)
    closeModal();
  }

  return (
    <div className="modal-container">
      <h2 style={{ textAlign: 'center' }}>How was your stay?</h2>
      <form>
        <textarea
          className="text-area"
          placeholder="Leave your review here..."
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          />
        {/* <input
          type="number"
          name="stars"
          min={1}
          max={5}
          value={stars}
          onChange={(e) => setStars(+e.target.value)}/> */}
          <div className="rating-input">
            <span className={stars > 0 || activeRating > 0 ? 'filled' : 'empty'}>
              <FaStar
                onMouseEnter={() => setActiveRating(1)}
                onMouseLeave={() => setActiveRating(stars)}
                onClick={() => setStars(1)}
              />
            </span>
            <span className={stars > 1 || activeRating > 1 ? 'filled' : 'empty'}>
              <FaStar
                onMouseEnter={() => setActiveRating(2)}
                onMouseLeave={() => setActiveRating(stars)}
                onClick={() => setStars(2)}
              />
            </span>
            <span className={stars > 2 || activeRating > 2 ? 'filled' : 'empty'}>
              <FaStar
                onMouseEnter={() => setActiveRating(3)}
                onMouseLeave={() => setActiveRating(stars)}
                onClick={() => setStars(3)}
              />
            </span>
            <span className={stars > 3 || activeRating > 3 ? 'filled' : 'empty'}>
              <FaStar
                onMouseEnter={() => setActiveRating(4)}
                onMouseLeave={() => setActiveRating(stars)}
                onClick={() => setStars(4)}
              />
            </span>
            <span className={stars > 4 || activeRating > 4 ? 'filled' : 'empty'}>
              <FaStar
                onMouseEnter={() => setActiveRating(5)}
                onMouseLeave={() => setActiveRating(stars)}
                onClick={() => setStars(5)}
              />
            </span>
            <label>Stars</label>
          </div>

        <button className="review-button" disabled={review.length < 10 || stars < 1} onClick={handleSubmit}>Submit your Review</button>
        {submitted && valErrors.review && <p className="errors">{valErrors.review}</p>}
        {submitted && valErrors.stars && <p className='errors'>{valErrors.stars}</p>}
      </form>
    </div>
  )
}

export default ReviewFormModal;
