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
import { LinkContainer } from 'react-router-bootstrap';
import { Form } from 'react-bootstrap';
import { store } from '../Store/store';
import { modeToggled } from '../Store/actions';


interface Props{
    mode:string
    style:{}
}

function NavBar(props:Props) { 

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

    const handleTogglemode = () => {
        store.dispatch(modeToggled())
    }

    const logo = "src\Logo-resized.jpg"


    return (
        <>
            <Navbar  bg='warning' sticky='top'  data-bs-theme='light' expand="sm" style={props.style}>
                <Container fluid>
                    
                        <Navbar.Brand as={Link} to='/'>
                            {/* <img
                            alt="logo"
                            src={logo}
                            width="60"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '} */}
                            Filmy Lens
                        </Navbar.Brand>
                    

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <LinkContainer to='/' activeStyle={{color:'brown'}} style={{color:'black'}}>
                                <Nav.Link >Home</Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to='/favourites' activeStyle={{color:'brown'}} style={{color:'black'}} >
                                <Nav.Link  >Favourites</Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to='/genres' activeStyle={{color:'brown'}} style={{color:'black'}}>
                                <Nav.Link  >Genres</Nav.Link>
                            </LinkContainer>

                        </Nav>
                        <Form.Check style={{fontSize:'15px',textAlign:'center'}}
                            type="switch"
                            id="custom-switch"
                            label={props.mode}    
                            onClick={handleTogglemode}
                        />
                        <div style={{marginLeft: "10px"}}>
                        {
                            (isLoggedIn) ?
                                 <Button variant="outline-dark" onClick={logoutClick}>Logout</Button> : <Button variant="outline-dark" onClick={loginClick} >Login</Button>
                        }
                        </div>
                        


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




