import React from "react";
import './custom.css'
import { Nav, Navbar, NavDropdown, Container, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Shopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="row">
                        <Nav className="header">
                            <div className="col-lg-3 header-left">
                                <Link to="/">Home </Link>
                                <Link to="/new"> NewProduct</Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                            <InputGroup className="header-middle col-lg-5">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <button type="button" className="btn btn-outline-primary">Search</button>
                            </InputGroup>
                            <div className="header-right col-lg-4">
                                <ModalLogin />                                
                            </div>
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header;