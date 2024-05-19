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

import {
  useCreateProductReviewMutation,
  useGetProductByIdQuery,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId);
  // console.log("qty", qty);
  // console.log("product.countInStock", [Array(product?.countInStock)]);
  // console.log("product.countInStock", [...Array(product?.countInStock)]);
  // console.log("product", [...Array(product?.countInStock).keys()]);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInformation } = useSelector((state) => state?.auth);

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

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateProductReviewMutation();

  const addToCartHandler = () => {
    console.log("added to cart");
    addToCart(dispatch(addToCart({ ...product, qty })));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      setComment("");
      setRating(0);
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
        <>
          <Meta title={product.name} />
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
                        {product?.countInStock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
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
                            {[...Array(product.countInStock).keys()]?.map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {userInformation ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loadingProductReview}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
