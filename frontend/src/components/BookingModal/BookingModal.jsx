import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotBookingsThunk } from "../../store/bookings"
import { DateRange } from "react-date-range"
import { eachDayOfInterval } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './BookingModal.css'
import { createBookingThunk } from "../../store/bookings"
import { useModal } from "../../context/Modal"
import { Navigate } from "react-router-dom"

export default function BookingModal({ spotId }) {
  const dispatch = useDispatch()
  const {closeModal} = useModal();

  const bookings = useSelector(state => state.bookings)
  const [dates, setDates] = useState([])
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleSubmit =  (e) => {
    e.preventDefault();
    const booking = {
      startDate: state[0].startDate,
      endDate: state[0].endDate
    }
    dispatch(createBookingThunk(spotId, booking))
    setBookingSuccess(true)
    console.log('wtf' , bookingSuccess)
    closeModal()
  }

  useEffect(() => {
    console.log(bookingSuccess)
    if(bookingSuccess) {
      console.log('FUCK')
    }
  },[bookingSuccess])

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

  const disableRange = (start, end) => {
      return eachDayOfInterval({ start, end });
  };

  return <div className="booking-modal">
    <DateRange
      className="date-picker"
      editableDateInputs={true}
      onChange={item => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      disabledDates={dates}
    />
    <div className="button-container">
    <button onClick={handleSubmit}>submit</button>
    <button>cancel</button>
    </div>
  </div>
}
