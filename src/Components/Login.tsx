import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {FormLabel } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { MyContext } from '../MyContext';

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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
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
                setIsLoggedIn(true)
                
            }

        })      
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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
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


