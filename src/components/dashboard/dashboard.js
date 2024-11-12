import React, { useEffect, useState } from "react";
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
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
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

function OrderRow(props) {
  const { order } = props;
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
          {order.giId}
        </TableCell>
        <TableCell>{order.gymId}</TableCell>
        <TableCell align="right">{order.insuranceId}</TableCell>
        <TableCell>{new Date(order.startDate).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(order.endDate).toLocaleDateString()}</TableCell>
        <TableCell align="right">${order.premiumAmount}</TableCell>
        <TableCell>{order.isActive ? "Active" : "Inactive"}</TableCell>
      </TableRow>
    </>
  );
}

OrderRow.propTypes = {
  order: PropTypes.shape({
    giId: PropTypes.string.isRequired,
    gymId: PropTypes.string.isRequired,
    insuranceId: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    premiumAmount: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
};

export default function Dashboard(props) {
  const { productsData } = props;
  const usersUrl = "http://localhost:5125/api/v1/User/";
  const ordersUrl = "http://localhost:5125/api/v1/GymInsurance";

  const [view, setView] = useState("products");
  const [allUsersData, setAllUsersData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [isOrderDataLoading, setIsOrderDataLoading] = useState(true);

  useEffect(() => {
    getAllUsersData();
    fetchOrdersData();
  }, []);

  function getAllUsersData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return setIsUserDataLoading(false);

    axios
      .get(usersUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setAllUsersData(response.data);
        setIsUserDataLoading(false);
      })
      .catch((error) => {
        setIsUserDataLoading(false);
        console.log("Error fetching users:", error);
      });
  }

  function fetchOrdersData() {
    setIsOrderDataLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return setIsOrderDataLoading(false);

    axios
      .get(ordersUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setOrdersData(response.data);
        setIsOrderDataLoading(false);
      })
      .catch((error) => {
        setIsOrderDataLoading(false);
        console.log("Error fetching orders:", error);
      });
  }

  const renderUsersTable = () => (
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
          {allUsersData && allUsersData.length > 0 ? (
            allUsersData.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No users available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderProductsTable = () => (
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

  const renderOrdersTable = () => (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell>Gym ID</TableCell>
            <TableCell align="right">Insurance ID</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell align="right">Premium Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData.map((order) => (
            <OrderRow key={order.giId} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderTable = () => {
    switch (view) {
      case "products":
        return renderProductsTable();
      case "users":
        return renderUsersTable();
      case "orders":
        return renderOrdersTable();
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button
        onClick={() => setView("products")}
        variant={view === "products" ? "contained" : "outlined"}
      >
        Products
      </Button>
      <Button
        onClick={() => setView("users")}
        variant={view === "users" ? "contained" : "outlined"}
      >
        Users
      </Button>
      <Button
        onClick={() => setView("orders")}
        variant={view === "orders" ? "contained" : "outlined"}
      >
        Orders
      </Button>

      {isUserDataLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        renderTable()
      )}
    </Box>
  );
}

Dashboard.propTypes = {
  productsData: PropTypes.array.isRequired,
};
