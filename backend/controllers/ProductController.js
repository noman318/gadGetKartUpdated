import Product from "../models/Product.model.js";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (products) {
      res.json(products);
    }
    throw new Error("Products not found try again");
  } catch (error) {
    next(error);
    console.log("error", error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  //   console.log("id", id);
  try {
    const productData = await Product.findById(id);
    if (productData) {
      return res.json(productData);
    }
    res.status(404);
    throw new Error("Product Not Found");
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export { getAllProducts, getProductById };
