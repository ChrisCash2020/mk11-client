export default function _404(props) {
  return (
    <div className='container'>
      <h1>404 | {props.message || 'page not found'}</h1>
    </div>
  )
}
