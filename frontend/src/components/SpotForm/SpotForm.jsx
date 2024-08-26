import { useState, useEffect } from "react"


function SpotForm() {
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
    if(country.length < 1 ) errors.country = 'Country is required'
    if(address.length < 1)  errors.address = 'Address is required'
    if(city.length < 1) errors.city = 'City is required'
    if(state.length < 1) errors.state = 'State is required'
    setValErrors(errors)


  },[country, address, city, state, description, name, price, prevImage, lat, lng])


  return <form className="new-spot-form" style={{display: 'flex', flexDirection: 'column', width: 500}}>
    <h2>Create a new Spot</h2>
    <p>Where's your place located? Guests will only get your exact address once they booked a reservation.</p>
    <div>
      <label htmlFor="country">Country</label>{valErrors.country && <span> {valErrors.country}</span>}
    </div>
    <input
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      placeholder="Country"
      type="text"
      name="country"/>
    <label htmlFor="address">Street Address</label>
    <input
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Address"
      type="text"
      name="address"/>
    <div className="city-state-container">
      <div><label htmlFor="city">City</label></div>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        type="text"
        name="city"/>
      <div><label htmlFor="state">State</label></div>
      <input
        value ={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        type="text"
        name="state"/>
    </div>
    <div className="lat-lng-container">
      <label htmlFor="latitude">Latitude</label>
      <input
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Latitude"
        type="number"
        name= "latitude"
        min={-90.0}
        max={90.0}
        />
      <label htmlFor="longitude">Longitude</label>
      <input
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        type="number"
        name="longitude"
        min={-180.0}
        max={180.0}
        />
    </div>
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
    <h3>Create a title for your spot</h3>
    <p>Catch guests' attention with a spot title that highlights what makes
    your place special.</p>
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Name of your spot"
      type="text"
      name="name"/>
    <hr />
    <h3>Set a base price for your spot</h3>
    <p>Competitive pricing can help your listing stand out and rank higher
    in search results.</p>
    <label>$
    <input
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      type="number"
      name="price"
      placeholder="Price per night (USD)" />
    </label>
    <hr />
    <h3>Liven up your spot with photos</h3>
    <p>Submit a link to at least one photo to publish your spot</p>
    <input
      value={prevImage}
      onChange={(e) => setPrevImage(e.target.value)}
      type="text"
      name='preview'
      placeholder="Preview Image URL"/>
    <input type="text" name='image' placeholder="Feature Coming Soon" disabled={true}/>
    <input type="text" name='image' placeholder="Feature Coming Soon" disabled={true}/>
    <input type="text" name='image'placeholder="Feature Coming Soon" disabled={true}/>
    <hr />
    <button>Create Spot</button>


  </form>

}

export default SpotForm
