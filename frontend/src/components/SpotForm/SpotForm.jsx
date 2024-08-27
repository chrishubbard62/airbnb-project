import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import './SpotForm.css'
import { createSpotThunk } from "../../store/spots"


const ENDINGS = ['.png', '.jpg', '.jpeg']


function SpotForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [description, setDescription] = useState('')
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [prevImage, setPrevImage] = useState('')
  /// set up additional images in the future
  const [valErrors, setValErrors] = useState({})
  const [createToggle, setCreateToggle] = useState(true)


  useEffect(() => {
    const errors = {}
    if (country.length < 1) errors.country = 'Country is required'
    if (address.length < 1) errors.address = 'Address is required'
    if (city.length < 1) errors.city = 'City is required'
    if (state.length < 1) errors.state = 'State is required'
    if (lat <-90 || lat > 90) errors.lat = 'Latitude muse be between -90 and 90'
    if (lng < -180 || lng > 180) errors.lng = 'Longitude must be between -180 and 180'
    if (description.length < 30) errors.description = 'description needs to be a minimum of 30 characters'
    if (name.length < 1) errors.name = 'Name is required'
    if (price < .01) errors.price = 'Price must be greater than $0'

    if (!ENDINGS.some((ending) => prevImage.endsWith(ending))) errors.prevImage = 'Image URL must end with .png .jpg, or .jpeg'
    if (prevImage.length < 1) errors.prevImage = 'Preview image is required'
    if (!Object.values(errors).length) setCreateToggle(false)
    setValErrors(errors)
  }, [country, address, city, state, description, name, price, prevImage, lat, lng])

    const handleSubmit = async (e) => {
      e.preventDefault();
      const spot = {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        prevImage
      }
      const newSpot =  await dispatch(createSpotThunk(spot))
      navigate(`/${newSpot.id}`)

    }

  return (
    <form className="new-spot-form" style={{ display: 'flex', flexDirection: 'column', width: 500 }}>
      <h2>Create a new Spot</h2>
      <p>Where&apos;s your place located? Guests will only get your exact address once they booked a reservation.</p>
      <div>
        <label htmlFor="country">Country</label>
        {valErrors.country && <span className="errors"> {valErrors.country}</span>}
      </div>
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        type="text"
        name="country" />
      <div>
        <label htmlFor="address">Street Address</label>
        {valErrors.address && <span className="errors"> {valErrors.address}</span>}
      </div>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        type="text"
        name="address" />
      <div>
        <label htmlFor="city">City</label>
        {valErrors.city && <span className="errors"> {valErrors.city}</span>}
      </div>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        type="text"
        name="city" />
      <div>
        <label htmlFor="state">State</label>
        {valErrors.state && <span className="errors"> {valErrors.state}</span>}
      </div>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        type="text"
        name="state" />
      <div>
        <label htmlFor="latitude">Latitude</label>
        {valErrors.lat && <span className="errors"> {valErrors.lat}</span>}
      </div>
      <input
        value={lat}
        onChange={(e) => setLat(+e.target.value)}
        type="number"
        name="latitude"
      />
      <div>
        <label htmlFor="longitude">Longitude</label>
        {valErrors.lng && <span className="errors"> {valErrors.lng}</span>}
      </div>
      <input
        value={lng}
        onChange={(e) => setLng(+e.target.value)}
        type="number"
        name="longitude"
      />

      <h3>Describe your place to guests</h3>
      <p>Mention the best features of your space, any special amentities like
        fast wifi or parking, and what you love about the neighborhood.</p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        name="description"
        id="">
      </textarea>
      {valErrors.description ? <div className="errors">{valErrors.description}</div> : <div className="hide">Validated</div>}
      <h3>Create a title for your spot</h3>
      <p>Catch guests&apos; attention with a spot title that highlights what makes
        your place special.</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of your spot"
        type="text"
        name="name" />
      {valErrors.name ? <div className="errors">{valErrors.name}</div> : <div className="hide">Validated</div>}
      <h3>Set a base price for your spot</h3>
      <p>Competitive pricing can help your listing stand out and rank higher
        in search results.</p>
      <label>$
        <input
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          type="number"
          name="price"
          placeholder="Price per night (USD)" />
      </label>
      {valErrors.price ? <div className="errors">{valErrors.price}</div> : <div className="hide">Validated</div>}
      <h3>Liven up your spot with photos</h3>
      <p>Submit a link to at least one photo to publish your spot</p>
      <input
        value={prevImage}
        onChange={(e) => setPrevImage(e.target.value)}
        type="text"
        name='preview'
        placeholder="Preview Image URL" />
      {valErrors.prevImage ? <div className="errors">{valErrors.prevImage}</div> : <div className="hide">Validated</div>}
      <input type="text" name='image' placeholder="Feature Coming Soon" disabled={true} />
      {<div className='hide'>Validated</div>}
      <input type="text" name='image' placeholder="Feature Coming Soon" disabled={true} />
      {<div className='hide'>Validated</div>}
      <input type="text" name='image' placeholder="Feature Coming Soon" disabled={true} />
      {<div className='hide'>Validated</div>}
      <hr />
      <button
        disabled={createToggle}
        onClick={handleSubmit}
      >Create Spot</button>
    </form>
  )

}

export default SpotForm
