import Product from "../models/Product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log("error", error);
  }
};

const getProductById = async (req, res) => {
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
  }
};

export { getAllProducts, getProductById };
