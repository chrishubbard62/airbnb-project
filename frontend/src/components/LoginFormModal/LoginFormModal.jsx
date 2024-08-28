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

  useEffect(() => {
    credential.length > 3 && password.length > 5 ? setDisabled(false) : setDisabled(true)
  }, [credential, password])


  return (
    <div className='modal-container'>
      <h1 style={{textAlign: 'center'}}>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button disabled={disabled} type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
