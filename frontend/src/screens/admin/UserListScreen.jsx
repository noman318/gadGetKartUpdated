import React from "react";
import {
  useDeleteUsersMutation,
  useGetAllUsersQuery,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading, refetch, error } = useGetAllUsersQuery({});
  //   console.log("users", users);
  const [deleteUser, { isLoading: loadingDeleteUser }] =
    useDeleteUsersMutation();
  const handleDeleteUser = async (id) => {
    console.log("Deleting user with ID:", id);
    let response;
    if (window.confirm("Are you sure")) {
      try {
        response = await deleteUser(id);
        console.log("Delete response:", response);
        toast.success("User Deleted");
        refetch();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(
          response?.error.data?.message ||
            error.message ||
            "An unknown error occurred"
        );
      }
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user?._id}>
                  <td> {user?._id} </td>
                  <td> {user?.name} </td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user?._id}/edit`}>
                      <Button className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteUser(user?._id)}
                      disabled={loadingDeleteUser}
                    >
                      <FaTrash color="white" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default UserListScreen;
