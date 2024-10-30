import { csrfFetch } from "./csrf"

const GET_SPOT_BOOKINGS = 'bookings/getSpotBookings'
const CREATE_BOOKING = 'bookings/createBooking'
const GET_USER_BOOKINGS = 'bookings/getUserBookings'

const getSpotBookings = (payload) => {
  return {
    type: GET_SPOT_BOOKINGS,
    payload
  }
}

const createBooking = (payload) => {
  return {
    type: CREATE_BOOKING,
    payload
  }
}

const getUserBookings = (payload) => {
  return {
    type: GET_USER_BOOKINGS,
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

export const createBookingThunk = (id, booking) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}/bookings`, {
    method: 'POST',
    body: JSON.stringify(booking),
    headers: {'Content-Type': 'application/json'}
  })
  if(res.ok) {
    const newBooking = await res.json()
    dispatch(createBooking(newBooking))
    return newBooking
  }
}

export const getUserBookingsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/bookings/current')
  if(res.ok) {
    const data = await res.json()
    dispatch(getUserBookings(data.Bookings))
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
    case GET_USER_BOOKINGS: {
      const newState= {...state}
      action.payload.forEach((booking) => {
        if(state[booking.id]) {
          newState[booking.id] = {...state[booking.id], ...booking}
        } else {
          newState[booking.id] = booking
        }
      })
      return newState
    }
    case CREATE_BOOKING: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }
    default:
    return state
  }
}

export default bookingsReducer;
