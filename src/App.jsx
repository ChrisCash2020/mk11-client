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
        mode: 'cors',
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
        method: 'POST',
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
  }, [allPosts])
  return (
    <Router>
      <nav className='navbar'>
        <div className='links'>
          <Link to='/'>MK11 Wiki</Link>
          {authState.status ? (
            <div className='loggedInContainer'>
              <h1>{authState.user.username}</h1>
              <button onClick={logOut}>Logout</button>
            </div>
          ) : (
            <div className='loggedInContainer'>
              <Link to='/auth/login'>Login</Link>
              <Link to='/auth/register'>Register</Link>
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route
          path='/user/update/:postId'
          element={
            <UpdateChar
              authState={authState}
              allPosts={allPosts}
              setAllPosts={(newPost) => setAllPosts(newPost)}
            />
          }
        />
        <Route
          path='/user/create/:userId'
          element={
            <CreateChar
              authState={authState}
              setAllPosts={(newPost) => setAllPosts(newPost)}
            />
          }
        />
        <Route path='/character/:postId' element={<Character />} />
        <Route
          path='/'
          element={
            <Home
              authState={authState}
              allPosts={allPosts}
              setAllPosts={(newPost) => setAllPosts(newPost)}
            />
          }
        />
        <Route
          path='/auth/login'
          element={
            <Login
              authState={authState}
              setAuthState={(newState) => setAuthState(newState)}
            />
          }
        />
        <Route
          path='/auth/register'
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
