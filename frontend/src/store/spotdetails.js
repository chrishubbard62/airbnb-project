import { csrfFetch } from "./csrf";

const GET_SPOT = 'spot/getSpot'

const getSpot = (payload) => {
  return {
    type: GET_SPOT,
    payload
  }
}

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  
  if(res.ok) {
    const data = await res.json()
    dispatch(getSpot(data))
    return res;
  }
}

const initialState = {}

const spotDetailReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SPOT: {
      const newState = {...state}
      newState[action.payload.id] = action.payload;
      return newState
    }
    default:
      return state;
  }
}

export default spotDetailReducer;
