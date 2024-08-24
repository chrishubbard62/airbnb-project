import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../store/spotdetails";


function SpotDetailsContainer() {
  const spotDetails = useSelector(state => state.spotDetails)
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const spot = spotDetails[spotId]


  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId))
  }, [dispatch, spotId])
  if(!spot) return <h2>Loading</h2>

  const PreviewImage = spot.SpotImages.find((img) => img.preview === true )


  return (
    <div>
      <h2>{spot.name}</h2>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <img style={{width: 500}} src={PreviewImage.url} alt={`${spot.name}`} />
      <p>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</p>
      <p>{spot.description}</p>
    </div>

  )
}

export default SpotDetailsContainer;
