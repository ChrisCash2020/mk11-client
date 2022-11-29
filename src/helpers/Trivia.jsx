import { useState } from 'react'

export default function Trivia(props) {
  const trivia = props.trivia
  const [count, setCount] = useState(0)
  return (
    <div key={trivia.id}>
      <textarea
        maxLength='500'
        name='text'
        id={trivia.id}
        value={trivia.text || ''}
        onChange={(e) => {
          props.handleTrivia(e), setCount(e.target.value.length)
        }}
        rows='2'
      ></textarea>

      <div id='the-count'>
        <span id='current'>{count} </span>
        <span id='maximum'>/ 500</span>
      </div>
      <button id={trivia.id} onClick={props.deleteTrivia}>
        Delete Trivia
      </button>
    </div>
  )
}
