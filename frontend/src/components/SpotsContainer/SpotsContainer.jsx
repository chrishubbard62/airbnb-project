import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotsThunk } from "../../store/spots";

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
      <ul>
      {spots?.map(({id, description}) => {
        return (
          <li key={`${id}`}>{description}</li>
        )
      })}
      </ul>

    </>
  )

}

export default SpotsContainer;
