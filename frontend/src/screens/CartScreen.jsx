import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    console.log("update the cart");
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    console.log("checking out");
    navigate(`/login?redirect=shipping`);
  };
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems?.map((cart) => (
              <ListGroup.Item key={cart?._id}>
                <Row>
                  <Col md={2}>
                    <Image src={cart?.image} alt={cart?.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${cart?._id}`}>{cart?.name}</Link>
                  </Col>
                  <Col md={2}>Rs.{cart?.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={cart.qty}
                      onChange={(e) => {
                        addToCartHandler(cart, Number(e.target.value));
                      }}
                    >
                      {[...Array(cart.countInStock).keys()]?.map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(cart._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems?.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              Rs.{" "}
              {cartItems
                ?.reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={() => checkOutHandler()}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
