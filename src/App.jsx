import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Character from './pages/Character'
import Home from './pages/Home'
import Login from './pages/Login'
import { useEffect, useState } from 'react'
import _404 from './helpers/_404'
import CreateChar from './pages/CreateChar'
import UpdateChar from './pages/UpdateChar'
import Register from './pages/Register'

function App() {
  const [authState, setAuthState] = useState({
    status: false,
    user: {
      id: '',
      username: '',
    },
  })
  const [allPosts, setAllPosts] = useState([])
  async function checkAuth() {
    const res = await fetch(
      'https://crud-mk11-chris.herokuapp.com/users/auth',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      }
    )
    let data = await res.json()
    if (data.error) {
    } else {
      setAuthState(data)
    }
  }
  async function logOut() {
    const res = await fetch(
      'https://crud-mk11-chris.herokuapp.com/users/auth/logout',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      }
    )
    const data = await res.json()

    setAuthState({
      status: false,
      user: {
        id: '',
        username: '',
      },
    })
  }
  useEffect(() => {
    checkAuth()
  }, [setAuthState])
  return (
    <Router>
      <nav className='navbar'>
        <div className='links'>
          <Link to='/mk11-client/'>MK11 Wiki</Link>
          {authState.status ? (
            <div className='loggedInContainer'>
              <h1>{authState.user.username}</h1>
              <button onClick={logOut}>Logout</button>
            </div>
          ) : (
            <div className='loggedInContainer'>
              <Link to='/mk11-client/auth/login'>Login</Link>
              <Link to='/mk11-client/auth/register'>Register</Link>
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route
          path='/mk11-client/user/update/:postId'
          element={
            <UpdateChar
              authState={authState}
              allPosts={allPosts}
              setAllPosts={(newPost) => setAllPosts(newPost)}
            />
          }
        />
        <Route
          path='/mk11-client/user/create/:userId'
          element={
            <CreateChar
              authState={authState}
              setAllPosts={(newPost) => setAllPosts(newPost)}
            />
          }
        />
        <Route path='/mk11-client/character/:postId' element={<Character />} />
        <Route
          path='/mk11-client/'
          element={
            <Home
              authState={authState}
              allPosts={allPosts}
              setAllPosts={(newPost) => setAllPosts(newPost)}
            />
          }
        />
        <Route
          path='/mk11-client/auth/login'
          element={
            <Login
              authState={authState}
              setAuthState={(newState) => setAuthState(newState)}
            />
          }
        />
        <Route
          path='/mk11-client/auth/register'
          element={
            <Register
              authState={authState}
              setAuthState={(newState) => setAuthState(newState)}
            />
          }
        />
        <Route path='*' element={<_404 />} />
      </Routes>
    </Router>
  )
}

export default App
