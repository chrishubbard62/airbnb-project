import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/getReviews'

const getReviews = (payload) => {
  return {
    type: GET_REVIEWS,
    payload
  }
}

export const getReviewsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
  if(res.ok) {
    const data = await res.json();
    dispatch(getReviews(data.Reviews))
    return data;
  }
}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const newState = {...state}
      action.payload.forEach((review) => {
        if(state[review.id]) {
          newState[review.id] = {...state[review.id], ...review}
        } else {
          newState[review.id] = review
        }
      })
      return newState
    }
    default:
      return state;
  }
}

export default reviewsReducer;
