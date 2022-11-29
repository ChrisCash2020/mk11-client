import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import _404 from '../helpers/_404'
export default function Login(props) {
  const navigate = useNavigate()
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [failed, setFailed] = useState(false)
  async function login() {
    const res = await fetch(
      'https://crud-mk11-chris.herokuapp.com/users/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: true,
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      }
    )
    let data = await res.json()
    if (data.id) {
      props.setAuthState({
        status: true,
        user: data,
      })
      navigate(`/mk11-client/`)
    } else {
      setFailed(true)
    }
  }

  return (
    <>
      {props.authState.status ? (
        <_404 message={'Already Logged In'} />
      ) : (
        <div className='container'>
          <div className='loginContainer'>
            <label>Username:</label>
            <input
              onChange={(e) => setLoginUsername(e.target.value)}
              type='text'
            />
            <label>Password:</label>
            <input
              onChange={(e) => setLoginPassword(e.target.value)}
              type='password'
            />
            <label className='error-message'>
              {failed ? 'Incorrect user credientials' : ''}
            </label>
            <button onClick={login}> Login </button>
          </div>
        </div>
      )}
    </>
  )
}
