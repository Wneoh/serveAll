import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../api/UserApi';

export const Header = () => {
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("allServeUser");
    localStorage.removeItem("allServe")
    navigate("/login");
  }
  return (
    <Navbar style={{backgroundColor:'#508bfc'}}
        collapseOnSelect
        variant='dark'
        expand = 'md'
    >
        <Navbar.Brand style={{marginLeft:'10px'}}>ServeAll</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{marginLeft:'auto'}}>
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link href="/ticket">Ticket</Nav.Link>
                <Nav.Link href="/note">Note</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="#" onClick={logOut}>Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
