import Order from "../models/Order.model.js";

const addOrderItems = async (req, res) => {
  try {
    // const products = await Order.find({});
    res.json("Add Order Items");
  } catch (error) {
    console.log("error", error);
  }
};

const getUserOrders = async (req, res) => {
  try {
    // const products = await Order.find({});
    res.json("These are My Orders");
  } catch (error) {
    console.log("error", error);
  }
};

const getOrderById = async (req, res) => {
  try {
    // const products = await Order.find({});
    res.json("Get order by Id");
  } catch (error) {
    console.log("error", error);
  }
};

const updateOrderToPaid = async (req, res) => {
  try {
    // const products = await Order.find({});
    res.json("Update Order to Paid");
  } catch (error) {
    console.log("error", error);
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    // const products = await Order.find({});
    res.json("Update Order to deliverd");
  } catch (error) {
    console.log("error", error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    // const products = await Order.find({});
    res.json("Get all Orders");
  } catch (error) {
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
