import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { plan } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {plan.planName}
        </TableCell>
        <TableCell>{plan.coverageType}</TableCell>
        <TableCell align="right">${plan.monthlyPremium}</TableCell>
        <TableCell>{plan.planDescription}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Coverage Details
              </Typography>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {plan.coverageDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  plan: PropTypes.shape({
    planName: PropTypes.string.isRequired,
    coverageType: PropTypes.string.isRequired,
    monthlyPremium: PropTypes.number.isRequired,
    planDescription: PropTypes.string.isRequired,
    coverageDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default function Dashboard(props) {
  //   const { productsData, usersData, ordersData } = props;
  const { productsData, usersData, onDeleteUser } = props;
  const [view, setView] = useState("users");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [editingUser, setEditingUser] = useState(null);
  console.log("Received Users Data in Dashboard:", usersData);

  const handleDeleteUser = (userId) => onDeleteUser(userId);
  const renderUsersTable = () => (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditingUser(user)}>Edit</Button>
                  <Button
                    color="error"
                    onClick={() => handleDeleteUser(user.userId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {editingUser ? (
        <Box mt={2}>
          <Typography>Edit User</Typography>
          <TextField label="Name" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
          <TextField label="Email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
          <Button>Save</Button>
        </Box>
      ) : (
        <Box mt={2}>
          <Typography>Add New User</Typography>
          <TextField label="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <TextField label="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <Button>Add</Button>
        </Box>
      )} */}
    </>
  );
  const renderProductsTable = () => (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Plan Name</TableCell>
              <TableCell>Coverage Type</TableCell>
              <TableCell align="right">Monthly Premium</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData.map((plan) => (
              <Row key={plan.insuranceId} plan={plan} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderTable = () => {
    switch (view) {
      case "products":
        return (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Plan Name</TableCell>
                  <TableCell>Coverage Type</TableCell>
                  <TableCell align="right">Monthly Premium</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsData.map((plan) => (
                  <Row key={plan.insuranceId} plan={plan} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case "users":
        return (
          <TableContainer component={Paper}>
            <Table aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case "orders":
        return (
          <TableContainer component={Paper}>
            <Table aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {ordersData.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button onClick={() => setView("products")}>Products</Button>
      <Button onClick={() => setView("users")}>Users</Button>
      {view === "users" && renderUsersTable()}
      {view === "products" && renderProductsTable()}
    </Box>
  );
}

Dashboard.propTypes = {
  productsData: PropTypes.array.isRequired,
  usersData: PropTypes.array.isRequired,
  //   ordersData: PropTypes.array.isRequired,
};
