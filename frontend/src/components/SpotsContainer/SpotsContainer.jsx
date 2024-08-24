
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotsThunk } from "../../store/spots";
import SpotCard from "./SpotCard";
import './SpotContainer.css'

function SpotsContainer() {
  const data = useSelector(state => state.spots)
  const dispatch = useDispatch();
  const spots = Object.values(data)

  useEffect(() => {
    dispatch(getSpotsThunk())

  }, [dispatch])

  return (
    <>
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
