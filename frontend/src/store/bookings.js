import { csrfFetch } from "./csrf"

const GET_SPOT_BOOKINGS = 'bookings/getspotbookings'

const getSpotBookings = (payload) => {
  return {
    type: GET_SPOT_BOOKINGS,
    payload
  }
}

export const getSpotBookingsThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}/bookings`)
  if(res.ok) {
    const data = await res.json()

    dispatch(getSpotBookings(data.Bookings))
    return data
  }
}

const initialState = {}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_BOOKINGS: {
      const newState = {...state}
      action.payload.forEach((booking) => {
        if(state[booking.id]) {
          newState[booking.id] = {...state[booking.id], ...booking}
        } else {
          newState[booking.id] = booking
        }
      })
      return newState
    }
    default:
    return state
  }
}

export default bookingsReducer;
