import React from "react";
import {
  useCreateProductMutation,
  useDeleteProductByIdMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import PaginateComponent from "../../components/Paginate";
const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({ pageNumber });

  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductByIdMutation();
  const [createProduct, { isLoading: productLoading }] =
    useCreateProductMutation();
  console.log("products", products);
  const handleCreateProduct = async () => {
    try {
      if (window.confirm("You want to create New product")) {
        await createProduct().unwrap();
        toast.success("Product Created");
        refetch();
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.data?.message || error.error);
    }
  };
  const handleDeleteProduct = async (id) => {
    console.log("id", id);
    try {
      if (window.confirm("You want to create New product")) {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted");
        refetch();
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="btn-sm m-3"
            onClick={handleCreateProduct}
            disabled={productLoading}
          >
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.products?.map((product, index) => (
                <tr key={product?._id}>
                  <td>{index + 1}</td>
                  <td>{product?.name}</td>
                  <td>Rs. {product?.price}</td>
                  <td>{product?.category}</td>
                  <td>{product?.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product?._id}/edit`}>
                      <Button className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteProduct(product?._id)}
                      disabled={loadingDeleteProduct}
                    >
                      <FaTrash color="white" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateComponent
            page={products.page}
            pages={products.pages}
            isAdmin={true}
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
