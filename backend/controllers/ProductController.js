import Product from "../models/Product.model.js";

const getAllProducts = async (req, res, next) => {
  const pageSize = 1;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  try {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    if (products) {
      return res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
  const { name, description, category, brand, price, image, countInStock } =
    req.body;
  try {
    const product = await Product.findById(id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
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

const addProductReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      const alreadyReviewd = product.reviews?.find(
        (review) => review.user.toString() === req.user._id.toString()
      );
      console.log("alreadyReviewd", alreadyReviewd);
      if (alreadyReviewd) {
        throw new Error("Product already reviwed");
      }
      const review = {
        name: req.user.name,
        rating,
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating = product.reviews?.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      await product.save();
      res.status(201).json({ message: "Review Added" });
    }
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
  addProductReview,
};
