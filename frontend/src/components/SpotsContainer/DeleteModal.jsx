import { useModal } from "../../context/Modal";

function DeleteModal(props) {
  const {spotId} = props;
  const {closeModal} = useModal();
  const handleNo = () => {

    closeModal();
  }

  const handleYes = () => {
    console.log(spotId)
  }

  return(<div>
          <h2>Confirm Delete</h2>
          <button onClick={handleYes}>Yes (Delete Spot)</button>
          <button onClick={handleNo}>No (Keep Spot)</button>
        </div>
        )
}

export default DeleteModal;
