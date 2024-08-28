import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";


function DeleteModal(props) {
  const {spotId, deleteType} = props;
  const dispatch = useDispatch();
  const {closeModal} = useModal();
  const handleNo = () => {
    closeModal();
  }

  const handleYes = () => {
    if(deleteType === 'Spot') {
      dispatch(deleteSpotThunk(spotId))
    } else {
      console.log('fuck yeah')
    }
    closeModal();
  }

  return(<div>
          <h2>Confirm Delete</h2>
          <button onClick={handleYes}>Yes {`(Delete ${deleteType})`}</button>
          <button onClick={handleNo}>No {`(Keep ${deleteType})`}</button>
        </div>
        )
}
export default DeleteModal;
