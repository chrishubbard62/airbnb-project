import { format } from "date-fns"
import './BookingPage.css'
import OpenModalButton from "../OpenModalButton"
import DeleteModal from "../DeleteModal"
import BookingModal from "../BookingModal"

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
        <OpenModalButton
          buttonText={'Edit'}
          type={'update'}
          modalComponent={<BookingModal />}
        />
        <OpenModalButton
          buttonText={'Delete'}
          modalComponent={<DeleteModal startDate={booking.startDate} bookingId={booking.id} deleteType={'booking'}/>}
        />
      </div>
    </div>


  )
}
