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

function OrderRow(props) {
  const { order, gymName } = props;
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
        <TableCell component="th" scope="row">
          {order.userId}
        </TableCell>
        <TableCell>{gymName}</TableCell>
        <TableCell>{order.startDate}</TableCell>
        <TableCell>{order.endDate}</TableCell>
        <TableCell align="right">${order.premiumAmount}</TableCell>
        <TableCell>{order.isActive ? "Active" : "Inactive"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Insurance IDs
              </Typography>
              <ul>
                {order.insuranceIds.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

OrderRow.propTypes = {
  order: PropTypes.shape({
    giId: PropTypes.string.isRequired,
    gymId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    insuranceIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    premiumAmount: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  gymName: PropTypes.string.isRequired,
};

export default function Dashboard(props) {
  const { productsData, gyms } = props;
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

  const getGymNameById = (gymId) => {
    const gym = gyms.find((g) => g.gymId === gymId);
    return gym ? gym.gymName : "NA";
  };

  const renderOrdersTable = () => (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Gym Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell align="right">Premium Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData.map((order) => (
            <OrderRow key={order.giId} order={order} gymName={getGymNameById(order.gymId)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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

      {isUserDataLoading || isOrderDataLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        view === "orders" ? renderOrdersTable() : null
      )}
    </Box>
  );
}

Dashboard.propTypes = {
  productsData: PropTypes.array.isRequired,
  gyms: PropTypes.array.isRequired,
};
