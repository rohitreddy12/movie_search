import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './movieCard.css'

interface CardDetails{
  title:string,
  poster_path:string
}

function movieCard(props:CardDetails) {
        
  return (
    <Card className='cardCustom'>
      <Card.Img className='card-imgCustom' variant="top" src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}  alt='Image Not Available'/>
      <Card.Body className='card-bodyCustom'>
        <Card.Title className='card-titleCustom'>{props.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default movieCard