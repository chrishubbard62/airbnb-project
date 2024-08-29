import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import './ReviewForm.css'

function ReviewFormModal({spotId, setNewReview}) {
  const session = useSelector(state => state.session)
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(1)
  const [valErrors, setValErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const {closeModal} = useModal();
  const dispatch = useDispatch();


  console.log(session.user)


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
        <input
          type="number"
          name="stars"
          min={1}
          max={5}
          value={stars}
          onChange={(e) => setStars(+e.target.value)}/>
        <button className="review-button" disabled={review.length < 10}onClick={handleSubmit}>Submit your Review</button>
        {submitted && valErrors.review && <p className="errors">{valErrors.review}</p>}
        {submitted && valErrors.stars && <p className='errors'>{valErrors.stars}</p>}
      </form>
    </div>
  )
}

export default ReviewFormModal;
