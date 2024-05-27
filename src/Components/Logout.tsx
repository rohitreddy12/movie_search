import React, { useContext, useState } from 'react'
import { Alert, Button, Form, FormLabel, Modal } from 'react-bootstrap'
import { MyContext } from '../MyContext'

interface Props{
    logoutShow:boolean,
    handleClose: () => void
}

function Logout(props:Props) {
    
    const {setIsLoggedIn} = useContext(MyContext) 

    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
        },
        body: JSON.stringify({
            session_id:localStorage.getItem('sessionId') 
        })
        };
    
    const logoutClick = () => {
        fetch('https://api.themoviedb.org/3/authentication/session?api_key=07c7b7634714bd11358f8eb30fff7102', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    
        localStorage.removeItem('sessionId')
        setIsLoggedIn(false)
        props.handleClose()
    }

    return (
        <Modal show={props.logoutShow} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="warning" onClick={() => logoutClick()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default Logout

