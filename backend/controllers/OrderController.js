import Order from "../models/Order.model.js";

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
      res.status(200).json(orders);
    } else {
      throw new Error("No Orders Found");
    }
  } catch (error) {
    next(error);
    console.log("error", error);
  }
};

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("user", "name email");
    if (order) {
      res.status(200).json(order);
    }
    res.status(404);
    throw new Error("Order Not found");
  } catch (error) {
    next(error);
    console.log("error", error);
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    // const products = await Order.find({});
    res.json("Update Order to Paid");
  } catch (error) {
    next(error);

    console.log("error", error);
  }
};

const updateOrderToDelivered = async (req, res, next) => {
  try {
    // const products = await Order.find({});
    res.json("Update Order to deliverd");
  } catch (error) {
    next(error);

    console.log("error", error);
  }
};

const addOrderItems = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    if (orderItems && orderItems.length === 0) {
      throw new Error("No order Items");
    } else {
      const order = new Order({
        orderItems: orderItems?.map((item) => ({
          ...item,
          product: item._id,
          _id: undefined,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);

    console.log("error", error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    // const products = await Order.find({});
    res.json("Get all Orders");
  } catch (error) {
    next(error);

    console.log("error", error);
  }
};

export {
  addOrderItems,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
