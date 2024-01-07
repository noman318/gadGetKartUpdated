import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError: error,
  } = useGetProductByIdQuery(productId);
  // console.log("qty", qty);
  // console.log("product.countInStock", [Array(product?.countInStock)]);
  // console.log("product.countInStock", [...Array(product?.countInStock)]);
  // console.log("product", [...Array(product?.countInStock).keys()]);
  const { cartItems } = useSelector((state) => state.cart);
  // console.log("cartItems", cartItems);
  const existItem = cartItems?.find(
    (data) => data._id === productId && data.qty >= qty
  );
  // console.log("existItem", existItem);
  // const myValue = existItem;
  // if (myValue) {
  //   // The value is truthy
  //   console.log("Truthy!");
  // } else {
  //   // The value is falsy
  //   console.log("Falsy!");
  // }

  const addToCartHandler = () => {
    console.log("added to cart");
    addToCart(dispatch(addToCart({ ...product, qty })));
    navigate("/cart");
  };
  return (
    <React.Fragment>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: Rs.{product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Rs.{product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>QTY</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()]?.map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn btn-block"
                    type="button"
                    disabled={existItem ? true : product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    {existItem ? "Already Added to Cart" : "Add To Cart"}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
