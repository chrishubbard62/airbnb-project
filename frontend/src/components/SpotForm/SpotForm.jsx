import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import './SpotForm.css'
import { createSpotThunk, getSpotsThunk, updateSpotThunk } from "../../store/spots"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const ENDINGS = ['.png', '.jpg', '.jpeg']

function SpotForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newSpot } = props;
  const { id } = useParams()
  const spot = useSelector(state => state.spots[id]);
  

  const [country, setCountry] = useState(spot?.country || '')
  const [address, setAddress] = useState(spot?.address || '')
  const [city, setCity] = useState(spot?.city || '')
  const [state, setState] = useState(spot?.state || '')
  const [lat, setLat] = useState(spot?.lat || '')
  const [lng, setLng] = useState(spot?.lng || '')
  const [description, setDescription] = useState(spot?.description || '')
  const [name, setName] = useState(spot?.name || '');
  const [price, setPrice] = useState(spot?.price || 0);
  const [prevImage, setPrevImage] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (newSpot) {
      setCountry('')
      setAddress('')
      setCity('')
      setState('')
      setLat('')
      setLng('')
      setDescription('')
      setName('')
      setPrice(0)
    }
  }, [newSpot])


  useEffect(() => {
    if (spot) {
      const { country, address, city, state, lat, lng, description, name, price } = spot;
      setCountry(country)
      setAddress(address)
      setCity(city)
      setState(state)
      setLat(lat)
      setLng(lng)
      setDescription(description)
      setName(name)
      setPrice(price)
    }
  }, [spot])

  useEffect(() => {
    async function getSpots() {
      await dispatch(getSpotsThunk());
    }
    getSpots()
  }, [dispatch])

  useEffect(() => {
    const errors = {}
    if (country.length < 1) errors.country = 'Country is required'
    if (address.length < 1) errors.address = 'Address is required'
    if (city.length < 1) errors.city = 'City is required'
    if (state.length < 1) errors.state = 'State is required'
    if (lat.length < 1) errors.lat = 'Latitude is required'
    if (lng.length < 1) errors.lng = 'Longitude is required'
    if (lat < -90 || lat > 90) errors.lat = 'Latitude muse be between -90 and 90'
    if (lng < -180 || lng > 180) errors.lng = 'Longitude must be between -180 and 180'
    if (description.length < 30) errors.description = 'description needs to be a minimum of 30 characters'
    if (name.length < 1) errors.name = 'Name is required'
    if (price < .01) errors.price = 'Price must be greater than $0'
    if (newSpot && !ENDINGS.some((ending) => prevImage.endsWith(ending))) errors.prevImage = 'Image URL must end with .png .jpg, or .jpeg'
    if (newSpot && prevImage.length < 1) errors.prevImage = 'Preview image is required'

    setValErrors(errors)
  }, [country, address, city, state, description, name, price, prevImage, lat, lng, newSpot])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (Object.values(valErrors).length) return;
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
    const newSpot = await dispatch(createSpotThunk(spot))
    navigate(`/${newSpot.id}`)
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (Object.values(valErrors).length) return;
    const spot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    }
    await dispatch(updateSpotThunk(id, spot))
    navigate(`/${id}`)
  }

  return (
    <form className="new-spot-form" style={{ display: 'flex', flexDirection: 'column', width: 500 }}>
      {newSpot ? <h2>Create a new Spot</h2> : <h2>Update your Spot</h2>}
      <p>Where&apos;s your place located? Guests will only get your exact address once they booked a reservation.</p>
      <div>
        <label htmlFor="country">Country</label>
        {submitted && valErrors.country && <span className="errors"> {valErrors.country}</span>}
      </div>
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        type="text"
        name="country" />
      <div>
        <label htmlFor="address">Street Address</label>
        {submitted && valErrors.address && <span className="errors"> {valErrors.address}</span>}
      </div>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        type="text"
        name="address" />
      <div>
        <label htmlFor="city">City</label>
        {submitted && valErrors.city && <span className="errors"> {valErrors.city}</span>}
      </div>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        type="text"
        name="city" />
      <div>
        <label htmlFor="state">State</label>
        {submitted && valErrors.state && <span className="errors"> {valErrors.state}</span>}
      </div>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        type="text"
        name="state" />
      <div>
        <label htmlFor="latitude">Latitude</label>
        {submitted && valErrors.lat && <span className="errors"> {valErrors.lat}</span>}
      </div>
      <input
        value={lat}
        onChange={(e) => setLat(+e.target.value)}
        type="number"
        name="latitude"
      />
      <div>
        <label htmlFor="longitude">Longitude</label>
        {submitted && valErrors.lng && <span className="errors"> {valErrors.lng}</span>}
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
      {submitted && valErrors.description ? <div className="errors">{valErrors.description}</div> : <div className="hide">Validated</div>}
      <h3>Create a title for your spot</h3>
      <p>Catch guests&apos; attention with a spot title that highlights what makes
        your place special.</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of your spot"
        type="text"
        name="name" />
      {submitted && valErrors.name ? <div className="errors">{valErrors.name}</div> : <div className="hide">Validated</div>}
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
      {submitted && valErrors.price ? <div className="errors">{valErrors.price}</div> : <div className="hide">Validated</div>}
      <h3>Liven up your spot with photos</h3>
      <p>Submit a link to at least one photo to publish your spot</p>
      <input
        disabled={!newSpot}
        value={prevImage}
        onChange={(e) => setPrevImage(e.target.value)}
        type="text"
        name='preview'
        placeholder={newSpot ? "Preview Image URL" : "Feature Coming Soon"} />
      {submitted && valErrors.prevImage ? <div className="errors">{valErrors.prevImage}</div> : <div className="hide">Validated</div>}
      <input type="text" name='image' placeholder="Feature Coming Soon" disabled={true} />
      {<div className='hide'>Validated</div>}
      <input type="text" name='image' placeholder="Feature Coming Soon" disabled={true} />
      {<div className='hide'>Validated</div>}
      <input type="text" name='image' placeholder="Feature Coming Soon" disabled={true} />
      {<div className='hide'>Validated</div>}
      {
        newSpot ? <button onClick={handleSubmit}>Create Spot</button> : <button onClick={handleUpdate}>Update</button>
      }
    </form>
  )
}

export default SpotForm
