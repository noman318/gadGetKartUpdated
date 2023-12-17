import { Row, Col, Container } from "react-bootstrap";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Prince Engineers &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
