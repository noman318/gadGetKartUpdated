import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/orderApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderByIdQuery(orderId);

  const [payOrder, { isLoading: payLoading }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: payPalLoading,
    error: payPalError,
  } = useGetPayPalClientIdQuery();
  const { userInformation } = useSelector((state) => state?.auth);
  // console.log("paypal", paypal);
  useEffect(() => {
    if (!payPalError && !payPalLoading && paypal?.clientId) {
      const loadPayPalScript = async () => {
        payPalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal?.clientId,
            currency: "USD",
          },
        });
        payPalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order?.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, payPalDispatch, payPalError, payPalLoading, paypal]);
  //   console.log("order", order);
  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();

  //   toast.success("Order is paid");
  // }

  const handleOrderToDeliver = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  async function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment Successfull");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  }

  async function onError(err) {
    toast.error(`Error: ${err?.message}`);
  }

  async function createOrder(data, actions) {
    return actions?.order
      ?.create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={"danger"} />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city}{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems?.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs. {item.price} = Rs.{" "}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs. {order?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs. {order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs. {order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs. {order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {payLoading && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <div>
                        <PayPalButtons
                          onApprove={onApprove}
                          onError={onError}
                          createOrder={createOrder}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              <ListGroup.Item>
                {userInformation &&
                  userInformation.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={handleOrderToDeliver}
                        disabled={loadingDeliver}
                      >
                        Mark As Deliver
                      </Button>
                    </>
                  )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
