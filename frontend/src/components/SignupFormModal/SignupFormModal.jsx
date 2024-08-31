// frontend/src/components/SignupFormPage/SignupFormModal.jsx

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';

import './SignupForm.css';


function SignupFormModal() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  useEffect(() => {
    email.length > 0 && username.length > 3 && firstName && lastName && password.length > 5 && confirmPassword.length > 5 ? setDisabled(false) : setDisabled(true)
  }, [email, username, firstName, lastName, password, confirmPassword])

  return (
    <div className='modal-container sign-up-form'>
      <h1 style={{textAlign: 'center'}}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Email</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <div>Username</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <div>First Name</div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          <div>Last Name</div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          <div>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          <div>Confirm Password</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button disabled={disabled} className='sign-up-submit' type="submit">Sign Up</button>
        {errors.email && <div className='errors'>{errors.email}</div>}
        {errors.username && <div className='errors'>{errors.username}</div>}
        {errors.firstName && <div className='errors'>{errors.firstName}</div>}
        {errors.lastName && <div className='errors'>{errors.lastName}</div>}
        {errors.confirmPassword && <div className='errors'>{errors.confirmPassword}</div>}
        {errors.password && <div className='errors'>{errors.password}</div>}
      </form>
    </div>
  );
}

export default SignupFormModal;
