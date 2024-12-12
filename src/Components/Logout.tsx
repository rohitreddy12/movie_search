import React, { useContext, useState } from 'react'
import { Alert, Button, Form, FormLabel, Modal } from 'react-bootstrap'
import { MyContext } from '../MyContext'
import { store } from '../Store/store'
import { userLoggedout } from '../Store/actions'


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
            Authorization:`${process.env.REACT_APP_AUTHORIZATION_KEY}`
        },
        body: JSON.stringify({
            session_id:localStorage.getItem('sessionId') 
        })
        };
    
    const logoutClick = () => {
        fetch(`https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_API_KEY}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    
        localStorage.removeItem('sessionId')
        store.dispatch(userLoggedout())
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

