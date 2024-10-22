import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotBookingsThunk } from "../../store/bookings"
import { DateRange } from "react-date-range"
import { eachDayOfInterval } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default function BookingModal({ spotId }) {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.bookings)
  const [dates, setDates] = useState([])

  /*
  1) thunk bookings and grab from store
  2) turn bookings into an array
  3) filter bookings array to only have the current spots id included
  4) iterate over the bookings and use custom function and date-fn each day of interval to return and array of date objects
  5) spread that array of date objects into the disabled day array
  6) add the disabled day array to the disable dates prop
  */


  useEffect(() => {
    if(bookings) {
      const bookArray = Object.values(bookings).filter((booking) => booking.spotId === +spotId)
      bookArray.forEach((booking) => setDates((dates) => [...dates, ...disableRange(booking.startDate, booking.endDate)]))
    }
  }, [bookings, spotId])

  useEffect(() => {
    dispatch(getSpotBookingsThunk(spotId))
  }, [dispatch, spotId])

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const disableRange = (start, end) => {
      const newStart = new Date(start)
      console.log('start', start)
      console.log('newStart', newStart)
      return eachDayOfInterval({ start, end });
  };

  return <>
    <DateRange
      editableDateInputs={true}
      onChange={item => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      disabledDates={dates}
    />
  </>
}
