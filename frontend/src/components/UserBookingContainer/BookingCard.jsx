import { format } from "date-fns"
import './BookingPage.css'
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "../DeleteModal"


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
      <div className="button-container">
        <button>Edit</button>
        <OpenModalButton
          buttonText={'Delete'}
          modalComponent={<DeleteModal bookingId={booking.id} deleteType={'booking'}/>}
        />
      </div>
    </div>


  )
}
