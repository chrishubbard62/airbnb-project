import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotBookingsThunk } from "../../store/bookings"
import { DateRange } from "react-date-range"
import { addDays, eachDayOfInterval } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default function BookingModal({ spotId }) {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.bookings[spotId])


  useEffect(() => {
    if(bookings) {
      const disabled = Object.values(bookings)
      console.log(disabled)
    }

  }, [bookings])

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

  // console.log(state[0].startDate)
  // console.log(state.endDate)

  // const newDis = dis.reduce((accumulator, book) => {
  //   return [...accumulator, ...disableRange(book.startDate, book.endDate)]
  // }, [])



  const disableRange = (start, end) => {
    const days = eachDayOfInterval({start, end})
    return eachDayOfInterval({ start, end });
  };

  const disabledDates = [
    ...disableRange(new Date(2024, 9, 1), new Date(2024, 9, 5)), // Disables from Nov 1 to Nov 5, 2024
    ...disableRange(addDays(new Date(), 10), addDays(new Date(), 15)), // Disables 10 to 15 days from now
  ];



  return <>
    <DateRange
      editableDateInputs={true}
      onChange={item => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      disabledDates={disabledDates}
    />
  </>
}
