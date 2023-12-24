import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      const { data } = await axios.get("/api/products");
      // console.log("data", data);
      setProducts(data);
    };
    fetchAllProducts();
  }, []);
  // console.log("products", products);
  return (
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
  );
}
