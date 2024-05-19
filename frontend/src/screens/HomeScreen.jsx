import React from "react";
// eslint-disable-next-line
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useParams } from "react-router-dom";
import PaginateComponent from "../components/Paginate";

export default function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const {
    data: products,
    isLoading,
    isError: error,
  } = useGetProductsQuery({ keyword, pageNumber });
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
            {products?.products?.map((product, index) => (
              <Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <PaginateComponent
            page={products.page}
            pages={products.pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </React.Fragment>
  );
}
