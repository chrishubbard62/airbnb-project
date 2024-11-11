import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { deleteReviewThunk } from "../../store/reviews";
import { deleteBookingThunk } from "../../store/bookings";
import './DeleteModal.css'


function DeleteModal(props) {
  const {spotId, deleteType, reviewId, bookingId} = props;
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const handleNo = () => {
    closeModal();
  }

  const handleYes = () => {
    if(deleteType === 'spot') {
      dispatch(deleteSpotThunk(spotId))
    } else if (deleteType === 'review'){
      dispatch(deleteReviewThunk(reviewId))
    } else {
      dispatch(deleteBookingThunk(bookingId))
    }
    closeModal();
  }

  return(<div className="delete-container">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this {deleteType}?</p>
          <button className='yes-button'onClick={handleYes}>Yes {`(Delete ${deleteType})`}</button>
          <button className='no-button' onClick={handleNo}>No {`(Keep ${deleteType})`}</button>
        </div>
        )
}
export default DeleteModal;
