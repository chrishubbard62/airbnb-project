import {format} from "date-fns"

export default function BookingCard({booking}) {
  return(
    <div>
      {console.log(booking.Spot.name)}
      <h3>{booking.Spot.name}</h3>
    <div>
    {" start: " + format(new Date(booking.startDate), 'MM/dd/yyyy')}
    {" end: " + format(new Date(booking.endDate), 'MM/dd/yyyy')}

    </div>

    </div>


  )
}
