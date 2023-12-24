import React from "react";
// eslint-disable-next-line
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";

export default function HomeScreen() {
  const { data: products, isLoading, isError: error } = useGetProductsQuery();
  // console.log("products", products);
  return (
    <React.Fragment>
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
          <h1>Latest Products</h1>
          <Row>
            {products?.map((product, index) => (
              <Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </React.Fragment>
  );
}
