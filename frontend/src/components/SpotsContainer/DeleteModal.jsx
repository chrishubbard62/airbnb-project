import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";


function DeleteModal(props) {
  const {spotId} = props;
  const dispatch = useDispatch();
  const {closeModal} = useModal();
  const handleNo = () => {

    closeModal();
  }

  const handleYes = () => {
    dispatch(deleteSpotThunk(spotId))
    closeModal();
  }

  return(<div>
          <h2>Confirm Delete</h2>
          <button onClick={handleYes}>Yes (Delete Spot)</button>
          <button onClick={handleNo}>No (Keep Spot)</button>
        </div>
        )
}
export default DeleteModal;
