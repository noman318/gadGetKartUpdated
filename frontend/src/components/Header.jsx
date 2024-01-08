import React from "react";
import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInformation } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("userInformation", userInformation);
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    console.log("Logged Out");
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("logged Out Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.data?.message || error?.error);
    }
  };
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
              {userInformation ? (
                <NavDropdown title={userInformation?.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* <Nav.Link href="/register">Register</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
