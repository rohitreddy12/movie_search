import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';
import { useContext, useState } from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';
import { MyContext } from '../MyContext';
import Logout from './Logout';




function NavBar() { 

    const {isLoggedIn,setIsLoggedIn} = useContext(MyContext)

    const [showLogin, setShowLogin] = useState<boolean>(false)
    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true)

    const [showLogout,setShowLogout] = useState<boolean>(false)
    const handleLogoutClose = () => setShowLogout(false);
    const handleLogoutShow = () => setShowLogout(true)
        

    const loginClick = () => {
        handleLoginShow();
    }

    const logoutClick = () => {
        handleLogoutShow()
    }

    console.log(isLoggedIn)

    


    return (
        <>
            <Navbar bg='warning '  data-bs-theme='light' expand="lg" >
                <Container fluid>
                    
                        <Navbar.Brand as={Link} to='/'>
                            {/* <img
                            alt="logo"
                            src='C:\New folder\movie_search\images\Screenshot 2024-04-26 043929.jpg'
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        /> */}
                            Filmy Lens
                        </Navbar.Brand>
                    

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            
                            <Nav.Link as={Link} to='/favourites'>Favourites</Nav.Link>
                            

                            <Nav.Link as={Link} to='/genres'>Genres</Nav.Link>

                        </Nav>
                        {
                            (isLoggedIn) ?
                                 <Button variant="outline-dark" onClick={logoutClick}>Logout</Button> : <Button variant="outline-dark" onClick={loginClick} >Login</Button>
                        }


                    </Navbar.Collapse>

                </Container>

            </Navbar>
            {
                showLogin && <Login  show={showLogin} handleClose={handleLoginClose} />
            }

            {
                showLogout && <Logout handleClose={handleLogoutClose} logoutShow={showLogout}/>
            }
        </>





    );
}

export default NavBar;




