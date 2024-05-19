import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { useProfileMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInformation } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useProfileMutation();
  const {
    data: orders,
    isLoading: loadingOrders,
    error,
  } = useGetMyOrdersQuery();
  // console.log("orders", orders);
  useEffect(() => {
    if (userInformation) {
      setEmail(userInformation.email);
      setName(userInformation.name);
    }
  }, [userInformation, userInformation.email, userInformation.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          // NOTE: here we don't need the _id in the request payload as this is
          // not used in our controller.
          // _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={isLoading}>
              Update
            </Button>
            {isLoading && <Loader />}
          </Form>
        </Col>
        <Col md={9}>
          <h2>{orders && orders.length > 0 ? "Orders" : "No Orders"}</h2>
          {loadingOrders ? (
            <Loader />
          ) : error ? (
            <Message variant={"danger"}>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              {orders && orders.length > 0 && (
                <Table striped hover responsive className="tabele-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order?._id}>
                        <td>{order?._id}</td>
                        <td>{order?.createdAt?.substring(0, 10)}</td>
                        <td>{order?.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order?._id}`}>
                            <Button variant="light">Details</Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScreen;
