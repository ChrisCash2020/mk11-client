import { useState } from 'react'
import Trivia from '../helpers/Trivia'
import { nanoid } from 'nanoid'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import _404 from '../helpers/_404'

export default function UpdateChar(props) {
  const navigate = useNavigate()
  const params = useParams()
  let publishMessage = ''
  if (params.postId == 1) {
    publishMessage = "Not admin can't update this article"
  }
  async function getPostById(id) {
    try {
      const res = await fetch(
        `https://crud-mk11-chris.herokuapp.com/posts/${id}`
      )
      const data = await res.json()
      setAbout(data.about)
      setAppearance(data.appearance)
      setName(data.name)
      setImage(data.image)
      setRealName(data.realName)
      setGender(data.gender)
      setFirstGame(data.firstGame)
      setLastGame(data.lastGame)
      setbirthPlace(data.birthPlace)
      setTrivia(data.trivia)
      setAboutCount(data.about.length)
      setAppearanceCount(data.appearance.length)
    } catch (error) {
      console.log('Get Post By Id Failed')
    }
  }
  useEffect(() => {
    getPostById(params.postId)
  }, [])
  const [about, setAbout] = useState('')
  const [appearance, setAppearance] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [realName, setRealName] = useState('')
  const [gender, setGender] = useState('')
  const [firstGame, setFirstGame] = useState('')
  const [lastGame, setLastGame] = useState('')
  const [birthPlace, setbirthPlace] = useState('')
  const [trivia, setTrivia] = useState([{ text: '', id: '' }])
  const [aboutCount, setAboutCount] = useState(0)
  const [appearanceCount, setAppearanceCount] = useState(0)
  const [failed, setFailed] = useState(false)
  //Trivia Methods
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
        text: '',
        id: nanoid(),
      },
    ])
  }
  const triviaArr = trivia.map((obj) => {
    return (
      <Trivia
        key={obj.id}
        trivia={obj}
        deleteTrivia={deleteTrivia}
        handleTrivia={handleTrivia}
      />
    )
  })
  //submit article
  async function UpdateArticle() {
    if (params.postId == 1) {
      return navigate(`/mk11-client/`)
    }
    const filterTrivia = trivia.filter((triv) => triv.text != '')
    const newTrivia = filterTrivia.map((triv) => triv.text.replaceAll('"', "'"))
    const article = {
      about: about.replaceAll('"', "'"),
      appearance: appearance.replaceAll('"', "'"),
      name: name.replaceAll('"', "'"),
      image: image.replaceAll('"', "'"),
      realName: realName.replaceAll('"', "'"),
      gender: gender.replaceAll('"', "'"),
      firstGame: firstGame.replaceAll('"', "'"),
      lastGame: lastGame.replaceAll('"', "'"),
      birthPlace: birthPlace.replaceAll('"', "'"),
      trivia: newTrivia,
    }
    for (const key in article) {
      if (article[key] == '' && key != 'trivia') {
        return setFailed(true)
      }
    }

    const res = await fetch(
      `https://crud-mk11-chris.herokuapp.com/posts/${params.postId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: true,
        body: JSON.stringify({ ...article }),
      }
    )
    const data = await res.json()
    props.setAllPosts(data)
    navigate(`/mk11-client/`)
  }
  // : !props.allPosts.some(
  //           (post) => post.userId === props.authState.user.id
  //         ) ? (
  //         <_404 message={'Wrong User Credentials'} />
  //       )
  return (
    <>
      {!props.authState.status ? (
        <_404 message={'Not Logged In'} />
      ) : (
        <main>
          <div id='character-container-left'>
            <h2 className='overview-header name'>
              {' '}
              <input
                value={name}
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
              value={image}
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
                      value={realName}
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
                      value={gender}
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
                      value={birthPlace}
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
                      value={firstGame}
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
                      value={lastGame}
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
              value={about}
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
              value={appearance}
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
              {failed ? 'You have errors in Article' : publishMessage}
            </label>
            <button className='article-submit' onClick={UpdateArticle}>
              Update Article
            </button>
          </div>
        </main>
      )}
    </>
  )
}
