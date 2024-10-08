import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/getReviews'
const CREATE_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/delete'

const deleteReview = (payload) => {
  return {
    type: DELETE_REVIEW,
    payload
  }
}

const getReviews = (payload) => {
  return {
    type: GET_REVIEWS,
    payload
  }
}

const createReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload
  }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })
  if(res.ok) {
    const deleted = await res.json();
    dispatch(deleteReview(reviewId))
    return deleted
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

export const createReviewThunk = (user, spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {'Content-Type': 'application/json'}
  })
  if(res.ok) {
    const newReview = await res.json();
    newReview.User = user;
    dispatch(createReview(newReview));
    return newReview;
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
    case CREATE_REVIEW: {
      const newState = {...state}
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = {...state}
      delete newState[action.payload]
      return newState
    }
    default:
      return state;
  }
}

export default reviewsReducer;
