import { useEffect } from "react"
import { getUserBookingsThunk } from "../../store/bookings"
import { useDispatch, useSelector } from "react-redux"
import BookingCard from "./BookingCard"
import './BookingPage.css'


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
      <h2 className="booking-title">Your current Bookings</h2>
      <div className="booking-outer">
      {userBookings.map(booking =>
       <BookingCard key={booking.id} booking={booking}/>
        )}
      </div>
    </div>
  )
}
