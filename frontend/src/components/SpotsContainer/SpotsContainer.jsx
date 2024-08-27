
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotsThunk } from "../../store/spots";
import SpotCard from "./SpotCard";
import './SpotContainer.css'

function SpotsContainer(props) {
  const data = useSelector(state => state.spots)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch();
  let spots = Object.values(data)
  const {current} = props
  if(current) {
    spots = spots.filter((spot) => spot.ownerId === session.user.id)
  }


  useEffect(() => {
      dispatch(getSpotsThunk())
  }, [dispatch, current])

  return (
    <>
    {console.log(current)}
      <h1>WELCOME TO BIKE BNB</h1>
      <div className="card-container" style={{}}>
      {spots?.map((spot) => {
        return (
          <SpotCard key={`${spot.id}`} spot={spot}/>
        )
      })}
      </div>
    </>
  )

}

export default SpotsContainer;
