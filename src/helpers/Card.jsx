import { Link } from 'react-router-dom'
export default function Card(props) {
  return (
    <Link to={`/character/${props.id}`} className='character-container'>
      <img src={props.image} />
      <h1>{props.name}</h1>
    </Link>
  )
}
