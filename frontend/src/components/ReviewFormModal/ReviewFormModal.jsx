import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";


function ReviewFormModal() {
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(1)
  const [valErrors, setValErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const {closeModal} = useModal();

  useEffect(() => {
    const errors = {}
    if(review.length < 1) errors.review = 'Review must have text'
    if(stars < 1 || stars > 5) errors.stars = 'stars must be between 1 and 5'
    setValErrors(errors)
  }, [review, stars])


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    if(Object.values(valErrors).length) {
      return;
    }
    closeModal();
  }

  return (
    <div className="modal-container">
      <h2 style={{ textAlign: 'center' }}>How was your stay?</h2>
      <form>
        <textarea
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
        <button onClick={handleSubmit}>Submit your Review</button>
        {submitted && valErrors.review && <p className="errors">{valErrors.review}</p>}
        {submitted && valErrors.stars && <p className='errors'>{valErrors.stars}</p>}
      </form>
    </div>
  )
}

export default ReviewFormModal;
