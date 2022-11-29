import { useState } from 'react'
import Trivia from '../helpers/Trivia'
import { nanoid } from 'nanoid'
import { useNavigate, useParams } from 'react-router-dom'
import _404 from '../helpers/_404'

export default function CreateChar(props) {
  const params = useParams()
  const navigate = useNavigate()
  const [about, setAbout] = useState('')
  const [appearance, setAppearance] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [realName, setRealName] = useState('')
  const [gender, setGender] = useState('')
  const [firstGame, setFirstGame] = useState('')
  const [lastGame, setLastGame] = useState('')
  const [birthPlace, setbirthPlace] = useState('')
  const [trivia, setTrivia] = useState([{ text: '', id: nanoid() }])
  const [aboutCount, setAboutCount] = useState(0)
  const [appearanceCount, setAppearanceCount] = useState(0)
  const [failed, setFailed] = useState(false)
  const [failed2, setFailed2] = useState(false)
  // ****
  // **** Trivia Methods
  // ****
  function handleTrivia(e) {
    const { name, value, type, id } = e.target
    setTrivia((oldTrivia) => {
      return oldTrivia.map((trivia) => {
        return trivia.id == id ? { ...trivia, [name]: value } : { ...trivia }
      })
    })
  }
  function deleteTrivia(e) {
    const { id } = e.target
    setTrivia((oldTrivia) => oldTrivia.filter((trivia) => trivia.id != id))
  }
  function addTrivia() {
    setTrivia((oldTrivia) => [
      ...oldTrivia,
      {
        id: nanoid(),
        text: '',
      },
    ])
  }
  const triviaArr = trivia.map((obj) => {
    return (
      <Trivia
        key={nanoid()}
        trivia={obj}
        deleteTrivia={deleteTrivia}
        handleTrivia={handleTrivia}
      />
    )
  })
  // ****
  // **** Publish article
  // ****
  async function publishArticle() {
    const filterTrivia = trivia.filter((triv) => triv.text != '')
    const newTrivia = filterTrivia.map((triv) => triv.text)
    // **** filter trivia array for proper sql strings
    const article = {
      about,
      appearance,
      name,
      image,
      realName,
      gender,
      firstGame,
      lastGame,
      birthPlace,
      trivia: newTrivia,
      userId: params.userId,
    }
    for (const key in article) {
      if (article[key] == '' && key != 'trivia') {
        // **** check if the data fields are filled
        return setFailed(true)
      }
    }

    const res = await fetch(`https://crud-mk11-chris.herokuapp.com/posts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...article }),
      //
    })
    const data = await res.json()
    console.log(data)
    if (data.message) {
      setFailed2(true)
    } else {
      // *** set a new state of the home page posts
      props.setAllPosts(data)
      navigate(`/mk11-client/`)
    }
  }

  return (
    <>
      {!props.authState.status ? (
        <_404 message={'Not Logged In'} />
      ) : props.authState.user.id != params.userId ? (
        <_404 message={'Wrong User Credentials'} />
      ) : (
        <main>
          <div id='character-container-left'>
            <h2 className='overview-header name'>
              {' '}
              <input
                required
                placeholder='Name'
                type='text'
                onChange={(e) => setName(e.target.value)}
              />
            </h2>
            <label className='error-message'>
              {name.length == 0 ? 'Please fill out this Field' : ''}
            </label>

            <img
              alt='Character'
              src='https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'
            />
            <input
              required
              placeholder='src'
              type='text'
              onChange={(e) => setImage(e.target.value)}
            />
            <label className='error-message'>
              {image.length == 0 ? 'Please fill out this Field' : ''}
            </label>
            <section>
              <h2 className='overview-header'>General Information</h2>
              <div className='overview-container'>
                <div className='overview-key'>
                  <div className='key'>Real Name</div>
                  <div className='key-desc'>
                    <input
                      required
                      type='text'
                      onChange={(e) => setRealName(e.target.value)}
                    />
                    <label className='error-message'>
                      {realName.length == 0 ? 'Please fill out this Field' : ''}
                    </label>
                  </div>
                </div>
                <div className='overview-key'>
                  <div className='key'>Gender</div>
                  <div className='key-desc'>
                    <input
                      required
                      type='text'
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label className='error-message'>
                      {gender.length == 0 ? 'Please fill out this Field' : ''}
                    </label>
                  </div>
                </div>
                <div className='overview-key'>
                  <div className='key'>Birthplace</div>
                  <div className='key-desc'>
                    <input
                      required
                      type='text'
                      onChange={(e) => setbirthPlace(e.target.value)}
                    />
                    <label className='error-message'>
                      {birthPlace.length == 0
                        ? 'Please fill out this Field'
                        : ''}
                    </label>
                  </div>
                </div>
                <div className='overview-key'>
                  <div className='key'>First Game</div>
                  <div className='key-desc'>
                    <input
                      required
                      type='text'
                      onChange={(e) => setFirstGame(e.target.value)}
                    />
                    <label className='error-message'>
                      {firstGame.length == 0
                        ? 'Please fill out this Field'
                        : ''}
                    </label>
                  </div>
                </div>
                <div className='overview-key'>
                  <div className='key'>Last Game</div>
                  <div className='key-desc'>
                    <input
                      required
                      type='text'
                      onChange={(e) => setLastGame(e.target.value)}
                    />
                    <label className='error-message'>
                      {lastGame.length == 0 ? 'Please fill out this Field' : ''}
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div id='character-container-right'>
            <h1>About</h1>
            <textarea
              maxLength='4000'
              name='about'
              id=''
              rows='10'
              onChange={(e) => {
                setAbout(e.target.value), setAboutCount(e.target.value.length)
              }}
            ></textarea>
            <label className='error-message'>
              {about.length == 0 ? 'Please fill out this Field' : ''}
            </label>
            <div id='the-count'>
              <span id='current'>{aboutCount} </span>
              <span id='maximum'>/ 4000</span>
            </div>
            <h1>Appearance</h1>
            <textarea
              maxLength='4000'
              name='about'
              id=''
              rows='26'
              onChange={(e) => {
                setAppearance(e.target.value),
                  setAppearanceCount(e.target.value.length)
              }}
            ></textarea>
            <label className='error-message'>
              {appearance.length == 0 ? 'Please fill out this Field' : ''}
            </label>
            <div id='the-count'>
              <span id='current'>{appearanceCount} </span>
              <span id='maximum'>/ 4000</span>
            </div>
            <h1 id='What you should already know'>Trivia</h1>
            {triviaArr}
            <br />
            <button style={{ background: 'orange' }} onClick={addTrivia}>
              Add Trivia
            </button>
            <br />
            <br />
            <label className='error-message'>
              {failed ? `You have errors in your article` : ''}
            </label>
            <label className='error-message'>
              {failed2 ? `You Are no longer logged in` : ''}
            </label>
            <button className='article-submit' onClick={publishArticle}>
              Publish Article
            </button>
          </div>
        </main>
      )}
    </>
  )
}
