import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {FormLabel } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { MyContext } from '../MyContext';
import { store } from '../Store/store';
import {  userLoggedin, usericonFetched } from '../Store/actions';

interface Props {
    show: boolean,
    handleClose: () => void
}
function Login(props:Props) {
    
    const {setIsLoggedIn} = useContext(MyContext)    

    const [isValidated,setIsValidated] = useState<boolean>()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setUserName(event.target.value)
    }

    const handlePassword: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value)
    }

    const options1 = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`
        },
        body: JSON.stringify({
            username: userName,
            password: password,
            request_token: localStorage.getItem('requestToken')
        })
    };

    const options2 = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`
        },
        body: JSON.stringify({
            request_token: localStorage.getItem('requestToken')
        })
    };

    const sessionCreate = () => {
        fetch('https://api.themoviedb.org/3/authentication/session/new',options2)
        .then(response => response.json())
        .then(response => {
            localStorage.setItem('sessionId',response.session_id)
            if(response.success){
                store.dispatch(userLoggedin())                            
            }     
        }) 
        .catch(err => console.log(err))     
    }

    const getuserIcon = () => {
        setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem('sessionId')}`)
            .then(response => response.json())
            .then(data => store.dispatch(usericonFetched(data.username)))
        }, 1000);    
    }

    const requestValidate = () => {
        fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', options1)
            .then(response => response.json())
            .then(response => { 
                const success = response.success;
                if(success){
                    setIsValidated(true)
                    sessionCreate();
                    setTimeout(() => {
                        props.handleClose();
                    },500)
                    getuserIcon();
                }
                else{
                    setIsValidated(false)
                }
                
            })
    }

    const reqToken = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`
            }
        };
        fetch('https://api.themoviedb.org/3/authentication/token/new', options)
            .then(response => response.json())
            .then(response => {
                localStorage.setItem('requestToken', response.request_token)
            })
            .catch(err => console.error(err));
    }

    useEffect(
        () => {reqToken()},[]
    )

    return (
        <Modal centered show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleUsername}
                            
                        />
                    </Form.Group>
                    <Form.Group>
                        <FormLabel>Password</FormLabel>
                        <Form.Control
                            type='password'
                            onChange={handlePassword}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {isValidated === true && <Alert variant='success'>Success! Let's get you right in</Alert>}
                {isValidated === false && <Alert style={{position:'relative', right:'14px'}} variant='danger'>Kindly check your entered credentials</Alert>}
                <Button onClick={requestValidate} variant='warning'>Submit</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default Login


