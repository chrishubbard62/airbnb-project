// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        data.credential = data.message
        if (data && data.credential) {

          setErrors(data);
        }
      });
  };

  const handleDemo = async (e) => {
    e.stopPropagation();
    setErrors({})
    await dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    closeModal();
  };


  useEffect(() => {
    credential.length > 3 && password.length > 5 ? setDisabled(false) : setDisabled(true)
  }, [credential, password])


  return (
    <div className='modal-container login-modal'>
      <h1 style={{textAlign: 'center'}}>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Username or Email</div>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
        <button disabled={disabled} className='submit-login' type="submit">Log In</button>
        <div className='demo-login' onClick={handleDemo}>Log In as Demo User</div>
        {errors.credential && (
          <p className='errors'>{errors.credential}</p>
        )}
      </form>
      {/* <button onClick={handleDemo}>Log in as Demo User</button> */}
    </div>
  );
}

export default LoginFormModal;
