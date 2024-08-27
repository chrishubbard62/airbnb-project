
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotsThunk } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import SpotCard from "./SpotCard";
import './SpotsContainer.css'

function SpotsContainer(props) {
  const data = useSelector(state => state.spots)
  const session = useSelector(state => state.session)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  let spots = Object.values(data)
  const {current} = props
  if(current) {
    spots = spots.filter((spot) => spot.ownerId === session.user.id)
  }

  useEffect(() => {
      dispatch(getSpotsThunk())
  }, [dispatch, current])

  const handleCreateButton = () => {
    navigate('/spots/new')
  }

  return (
    <> {current ? (
        <div>
          <h1>Manage Spots</h1>
          <button onClick={handleCreateButton}>Create a New Spot</button>
        </div>
      ) : (
        <h1>WELCOME TO BIKE BNB</h1>
      )}
      <div className="card-container" style={{}}>
      {spots?.map((spot) => {
        return (
          <SpotCard key={`${spot.id}`} spot={spot} current={current}/>
        )
      })}
      </div>
    </>
  )

}

export default SpotsContainer;
