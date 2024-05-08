import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import logo from 'C:\New folder\movie_search\images\Screenshot 2024-04-26 043929.jpg';
import './navbar.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import Login from './Login';


function NavScrollExample() {
    
    const [show, setShow] = useState<boolean>(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M3Yjc2MzQ3MTRiZDExMzU4ZjhlYjMwZmZmNzEwMiIsInN1YiI6IjY2MTAyNzcxZDg2MWFmMDE2NGYzYTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6v1iORQR-M6zqXrZfqaUdBEjJrLT2l5c6X6j6en5HsM'
        }
    };

    const reqToken = () => {
        fetch('https://api.themoviedb.org/3/authentication/token/new', options)
            .then(response => response.json())
            .then(response => {
                localStorage.setItem('requestToken', response.request_token)
            })
            .catch(err => console.error(err));
    }

    const loginClick = () => {
        handleShow();//set the show state to true
        reqToken();  //fetch the request token 
    }

    
    return (
        <>
            <Navbar bg='warning ' sticky='top' data-bs-theme='light' expand="lg" >
            <Container fluid>
                <LinkContainer to='/'>
                    <Navbar.Brand >
                        {/* <img
                            alt="logo"
                            src='C:\New folder\movie_search\images\Screenshot 2024-04-26 043929.jpg'
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        /> */}
                        Filmy Lens</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
                        <LinkContainer to='/favourites'>
                            <Nav.Link>Favourites</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="Genres" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Crime</NavDropdown.Item>
                            <NavDropdown.Item href="#action5">Comedy</NavDropdown.Item>
                            <NavDropdown.Item href="#action5">Drama</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>

                    <Button variant="outline-dark" onClick={loginClick} >Login</Button>

                </Navbar.Collapse>

            </Container>

        </Navbar>
        {
            show && <Login show={show} onClose={handleClose}/>
        }
        </>
        




    );
}

export default NavScrollExample;




