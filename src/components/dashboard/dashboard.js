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
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";


function Row(props) {
  const { plan, onDelete } = props;
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
        <TableCell align="center">
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => onDelete(plan.insuranceId)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
    insuranceId: PropTypes.number.isRequired, // Assuming insuranceId is a number
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

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
        <TableCell>{order.userId}</TableCell>
        <TableCell>{gymName}</TableCell>
        <TableCell align="right">
          {order.insuranceIds.join(", ")}
        </TableCell>
        <TableCell>{new Date(order.startDate).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(order.endDate).toLocaleDateString()}</TableCell>
        <TableCell align="right">${order.premiumAmount}</TableCell>
        <TableCell>{order.isActive ? "Active" : "Inactive"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Insurance IDs
              </Typography>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {order.insuranceIds.map((id, index) => (
                  <li key={index}>{id}</li>
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
  const plansUrl = "http://localhost:5125/api/v1/InsurancePlan/";
  const navigate = useNavigate();

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
        console.log(response.data);
        setOrdersData(response.data);
        setIsOrderDataLoading(false);
      })
      .catch((error) => {
        setIsOrderDataLoading(false);
        console.log("Error fetching orders:", error);
      });
  }

  function handleDeleteProduct(insuranceId) {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      axios
        .delete(`${plansUrl}${insuranceId}`)
        .then(() => {
          setOrdersData((prevData) =>
            prevData.filter((plan) => plan.insuranceId !== insuranceId)
          );
        })
        .catch((error) => {
          console.log("url "+`${plansUrl}${insuranceId}`);
          console.error("Error deleting product:", error);
        });
    }
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
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsData.map((plan) => (
            <Row
              key={plan.insuranceId}
              plan={plan}
              onDelete={handleDeleteProduct}
            />
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
            <TableCell>User ID</TableCell>
            <TableCell>Gym Name</TableCell>
            <TableCell align="right">Insurance ID</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell align="right">Premium Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData.map((order) => (
            <OrderRow key={order.giId} order={order} gymName={getGymNameById(order.gymId)}  />
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

  const getGymNameById = (gymId) => {
    console.log("Looking for gym with ID:", gymId, "Type:", typeof gymId);
    const gym = gyms.find((g) => g.gymId === gymId); 
    console.log("Found gym:", gym); 
    return gym ? gym.gymName : "NA"; 
  };
  

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/plansForm")}
          sx={{
            borderRadius: "20px",
            padding: "10px 20px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Add New Plan
        </Button>
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
