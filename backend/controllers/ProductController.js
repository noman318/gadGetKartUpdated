import Product from "../models/Product.model.js";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (products) {
      return res.json(products);
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

const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: "sample product",
      user: req.user._id,
      price: 0,
      image: "/images/sample.jpg",
      description: "Sample description",
      brand: "Sample Brand",
      category: "Sample Category",
      countInStock: 0,
      numReviews: 0,
    });
    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    category,
    brand,
    price,
    image,
    countInStock,
    numReviews,
  } = req.body;
  try {
    const product = await Product.findById(id);
    if (product) {
      product.name = name;
      product.description = description;
      product.category = category;
      product.numReviews = numReviews;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      return res.status(201).json(updatedProduct);
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return res.json(deletedProduct);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
};
