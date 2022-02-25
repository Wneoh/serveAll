import React from 'react';
import { Navbar,Nav,NavbarBrand } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export const Header = () => {
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
                <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
