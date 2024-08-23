import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = "spots/getAllSpots"

const getSpots = (payload) => {
  return {
    type: GET_ALL_SPOTS,
    payload
  }
}

export const getSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if(res.ok) {
    const data = await res.json();
    dispatch(getSpots(data.Spots))
    return res;
  }
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = {...state}
      action.payload.forEach((spot) => {
        newState[spot.id] = spot;
      })
      return newState
    }
  default:
    return state
  }
}

export default spotsReducer;
