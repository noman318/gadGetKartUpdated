import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product?._id}`}>
        <Card.Img src={product?.image} variant="top" />
        <Card.Body>
          <Card.Title as={"div"} className="product-title">
            <strong>{product?.name}</strong>
          </Card.Title>
        </Card.Body>
      </Link>
      <Card.Text as={"div"}>
        <Rating
          value={product.rating}
          text={`${product?.numReviews} reviews`}
        />
      </Card.Text>
      <Card.Text as={"h3"}>Rs.{product?.price}</Card.Text>
    </Card>
  );
};
export default Product;
