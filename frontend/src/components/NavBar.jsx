import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom";
import savrLogo from '../assets/Savr_Navbar_Logo.png';

function NavigationBar() {
    
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={savrLogo}
            alt="Savr Logo"
            height='56px'
            className="d-inline-block align-top" 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Social" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Home</NavDropdown.Item>
              <NavDropdown.Item href="/friendPosts">Friends</NavDropdown.Item>
              <NavDropdown.Item href="/userPostCreation">Create Post</NavDropdown.Item>
              <NavDropdown.Item href="/yourPosts">Your Posts</NavDropdown.Item>
              <NavDropdown.Item href="/savedPosts">Saved Posts</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/edit_profile">
                Edit Profile
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/promotion">Promotions</Nav.Link>
            <Nav.Link href="/findfood">Find Food</Nav.Link>
            <Nav.Link href="#"
              onClick={(e) => {
                e.preventDefault();
                const confirmLogout = window.confirm("Are you sure you want to logout?");
                if (confirmLogout) {
                  window.location.href="/logout";
                }
              }}
            > Logout </Nav.Link>
            {/* <Nav.Link href="/logout">Logout</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;