import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import _404 from '../helpers/_404'
export default function Register(props) {
  const navigate = useNavigate()
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [failed, setFailed] = useState(false)
  async function register() {
    const res = await fetch(
      'https://crud-mk11-chris.herokuapp.com/users/register',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
        credentials: 'include',
      }
    )
    let data = await res.json()
    if (data.error) {
      setFailed(true)
    } else {
      props.setAuthState({
        status: true,
        user: data[0],
      })
      navigate('/')
    }
  }
  return (
    <>
      {props.authState.status ? (
        <_404 message={'Already Logged In'} />
      ) : (
        <div className='container'>
          <div className='loginContainer' style={{ padding: '20px 40px' }}>
            <label className='padding-bottom'>Username:</label>
            <label className='error-message'>
              {failed ? 'Username taken' : ''}
            </label>
            <input
              onChange={(e) => setRegisterUsername(e.target.value)}
              type='text'
            />
            <label>Password:</label>
            <input
              onChange={(e) => setRegisterPassword(e.target.value)}
              type='password'
            />
            <button onClick={register}> Register </button>
          </div>
        </div>
      )}
    </>
  )
}
