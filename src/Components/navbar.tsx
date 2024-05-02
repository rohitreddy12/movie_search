import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import logo from 'C:\New folder\movie_search\images\Screenshot 2024-04-26 043929.jpg';
import './navbar.css';
import { LinkContainer } from 'react-router-bootstrap';


function NavScrollExample() {
    return (
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

                    </Navbar.Collapse>
                    <Button variant="outline-dark">Login</Button>
                </Container>

            </Navbar>

        


    );
}

export default NavScrollExample;




