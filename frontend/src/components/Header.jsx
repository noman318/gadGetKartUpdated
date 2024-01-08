import React from "react";
import { Nav, Navbar, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state?.auth);
  console.log("userInfo", userInfo);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo_image" />
              Prince Engineers
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar" />
          <Navbar.Collapse id="basic-navbar">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Login
                </Nav.Link>
              </LinkContainer>
              {/* <Nav.Link href="/register">Register</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
