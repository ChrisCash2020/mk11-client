import { useEffect, useState } from 'react'
import Card from '../helpers/Card'
import AddIcon from '@mui/icons-material/Add'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

export default function Home(props) {
  const allPosts = props.allPosts
  const setAllPosts = props.setAllPosts
  async function getPosts() {
    const res = await fetch('https://crud-mk11-chris.herokuapp.com/posts')
    const data = await res.json()
    setAllPosts(data.allPosts)
  }
  async function delPosts(id) {
    const res = await fetch(
      `https://crud-mk11-chris.herokuapp.com/posts/delete/${id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      }
    )
    getPosts()
  }
  useEffect(() => {
    getPosts()
  }, [allPosts])
  useEffect(() => {
    getPosts()
  }, [])
  const cards = allPosts.map((post, i) => (
    <div className='center' key={nanoid()}>
      <Card
        key={nanoid()}
        userId={post.userId}
        id={post.id}
        name={post.name}
        image={post.image}
      />

      <div className='update-article'>
        {props.authState.status == true && post.id != 1 && (
          <a onClick={() => delPosts(post.id)} className='edit'>
            <DeleteIcon />
          </a>
        )}
        {props.authState.status == true && (
          <Link to={`/user/update/${post.id}`} className='edit'>
            <CreateIcon />
          </Link>
        )}
      </div>
    </div>
  ))
  return (
    <>
      <div className='container'>{cards}</div>
      {props.authState.status && (
        <>
          <Link to={`/user/create/${props.authState.user.id}`} id='form-btn'>
            <AddIcon
              style={{ fontSize: '2.5rem', textShadow: '-1px 1px 0 #000' }}
            />
          </Link>
          <div id='create'>create</div>
        </>
      )}
    </>
  )
}
