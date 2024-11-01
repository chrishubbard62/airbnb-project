import { useEffect } from "react"
import { getUserBookingsThunk } from "../../store/bookings"
import { useDispatch, useSelector } from "react-redux"
import {format} from "date-fns"



export default function UserBookingPage() {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.bookings)
  const session = useSelector(state => state.session)
  const userBookings = Object.values(bookings).filter((booking) => booking.userId === session.user.id)

  useEffect(() => {
    dispatch(getUserBookingsThunk())

  }, [dispatch])

  if(!userBookings) {
    return <h2>Loading</h2>
  }

  return (
    <div>
      <h2>Your current Bookings</h2>
      {userBookings.map(booking =>
      <p key={booking.id}>{booking?.Spot?.name}
        {" start: " + format(new Date(booking.startDate), 'MM/dd/yyyy')}
       {" end: " + format(new Date(booking.endDate), 'MM/dd/yyyy')}
       </p>)}
    </div>
  )
}
