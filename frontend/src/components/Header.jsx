import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="logo_image" />
            Prince Engineers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar" />
          <Navbar.Collapse id="basic-navbar">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <FaShoppingCart />
                Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <FaUser /> Login
              </Nav.Link>
              {/* <Nav.Link href="/register">Register</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
