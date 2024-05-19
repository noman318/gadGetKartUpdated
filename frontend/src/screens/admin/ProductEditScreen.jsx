import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId);

  const [updateProduct, { isLoading: loadingProjectUpdate }] =
    useUpdateProductMutation();
  const [uploadImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  useEffect(() => {
    if (product) {
      setPrice(product.price);
      setBrand(product.brand);
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Product updated");
      refetch();
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleUploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    // console.log("e.target.files[0]", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      console.log("res", res);
      toast.success(res?.message);
      setImage(res?.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go Back
      </Link>
      <h1>Edit Product</h1>
      <FormContainer>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={handleUploadImage}
                type="file"
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
              disabled={loadingProjectUpdate}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
