import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CharacterPage() {
  const [data, setData] = useState({})
  const params = useParams()
  useEffect(() => {
    async function getPostById() {
      const res = await fetch(
        `https://crud-mk11-chris.herokuapp.com/posts/${params.postId}`,
        { credentials: 'include' }
      )
      const data = await res.json()
      setData(data)
    }
    getPostById()
  }, [])

  const character = (
    <>
      <div id='character-container-left'>
        <h2 className='overview-header name'>{data.name}</h2>
        <img alt='Character' src={data.image} />
        <section>
          <h2 className='overview-header'>General Information</h2>
          <div className='overview-container'>
            <div className='overview-key'>
              <div className='key'>Real Name</div>
              <div className='key-desc'>{data.realName}</div>
            </div>
            <div className='overview-key'>
              <div className='key'>Gender</div>
              <div className='key-desc'>{data.gender}</div>
            </div>
            <div className='overview-key'>
              <div className='key'>Birthplace</div>
              <div className='key-desc'>{data.birthPlace}</div>
            </div>
            <div className='overview-key'>
              <div className='key'>First Game</div>
              <div className='key-desc'>{data.firstGame}</div>
            </div>
            <div className='overview-key'>
              <div className='key'>Last Game</div>
              <div className='key-desc'>{data.lastGame}</div>
            </div>
          </div>
        </section>
      </div>
      <div id='character-container-right'>
        <h1>About</h1>
        <p>{data.about}</p>

        <h1>Appearance</h1>
        <p>{data.appearance}</p>
        <h1 id='What you should already know'>Trivia</h1>
        {data.trivia != undefined &&
          data.trivia.map((fact, i) => <li key={i}>{fact.text}</li>)}
        <br />
        <br />
      </div>
    </>
  )
  return <main>{character}</main>
}
