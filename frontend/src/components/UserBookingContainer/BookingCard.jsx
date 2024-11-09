import { format } from "date-fns"
import './BookingPage.css'

export default function BookingCard({ booking }) {
  return (
    <div className="booking-container">
      <h3>{booking.Spot.name}</h3>
      <div>
        <p>
          {" start: " + format(new Date(booking.startDate), 'MM/dd/yyyy')}
          {" end: " + format(new Date(booking.endDate), 'MM/dd/yyyy')}
        </p>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>


  )
}
