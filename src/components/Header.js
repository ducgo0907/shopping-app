import React, { useState } from "react";
import './custom.css'
import { Nav, Navbar, Container, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import { FaShoppingCart } from "react-icons/fa";

const Header = (props) => {
    const [searchName, setSearchName] = useState("");
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Shopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="row">
                    <Nav className="header">
                        <div className="col-lg-3 header-left">
                            <Link to="/" className="button-tab">Home </Link>
                            <Link to="/new" className="button-tab"> NewProduct</Link>
                        </div>
                        <form className="header-middle" onSubmit={(e) => props.searchProduct(e, searchName)}>
                            <InputGroup className="header-middle col-lg-5">
                                <input
                                    type="search"
                                    className="form-control rounded"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={(e) => props.searchProduct(e, searchName)}
                                >
                                    Search
                                </button>
                            </InputGroup>
                        </form>
                        <div className="col-lg-4">
                            <div className="header-right row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <ModalLogin />
                                        <div className="col-lg-7" id="shopping-icon">
                                            <Link to='/cart' className="shopping-link">
                                                <FaShoppingCart
                                                    size="28px"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header;