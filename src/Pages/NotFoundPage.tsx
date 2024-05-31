import { Button } from 'react-bootstrap'
import './notFoundPage.css'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <>
    <div className='errDesc'>Oops!Page Not Found</div>

    <Link to={'/'}>
      <div><Button variant='warning'>Go Home</Button></div>
    </Link>
    
    </>
  )
}

export default NotFoundPage