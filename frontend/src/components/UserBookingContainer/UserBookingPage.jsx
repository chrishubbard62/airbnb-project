import { useEffect } from "react"
import { getUserBookingsThunk } from "../../store/bookings"
import { useDispatch, useSelector } from "react-redux"



export default function UserBookingPage() {
  const dispatch = useDispatch()
  const bookings = useSelector(state => state.bookings)
  const session = useSelector(state => state.session)
  const userBookings = Object.values(bookings).filter((booking) => booking.userId === session.user.id)

  useEffect(() => {
    dispatch(getUserBookingsThunk())
  }, [dispatch])

  return (
    <div>
      <h2>Your current Bookings</h2>
      {userBookings.map(booking => <p key={booking.id}>{booking.Spot.name}</p>)}
    </div>
  )
}
