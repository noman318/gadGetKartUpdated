/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import { useForgotPasswordMailMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotPasswordMail, { isLoading }] = useForgotPasswordMailMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPasswordMail({ email }).unwrap();
      console.log("res", res);
      //   dispatch(setCredentials({ ...res }));
      toast.success(res.message);
      setTimeout(() => {
        toast.info("Check your mail inbox to reset your password");
      }, 3000);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <FormContainer>
      <h1>Forgot Password?</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-2"
        >
          Send Email
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Sign In? <Link to={"/login"}>Sign IN</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ForgotPassword;
