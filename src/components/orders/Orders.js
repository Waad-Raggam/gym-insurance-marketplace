import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";

function OrderRow({ order, gymName }) {
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
        <TableCell>{gymName}</TableCell>
        <TableCell align="right">
          {order.insuranceIds.length > 0 ? order.insuranceIds.join(", ") : "N/A"}
        </TableCell>
        <TableCell>{new Date(order.startDate).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(order.endDate).toLocaleDateString()}</TableCell>
        <TableCell align="right">${order.premiumAmount}</TableCell>
        <TableCell>{order.isActive ? "Active" : "Inactive"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Insurance IDs
              </Typography>
              <Table size="small" aria-label="insurance-ids">
                <TableBody>
                  {order.insuranceIds.map((id, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
    insuranceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    premiumAmount: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  gymName: PropTypes.string.isRequired, 
};


export default function OrdersTable(props) {
  const { gyms } = props;
  const ordersUrl = "http://localhost:5125/api/v1/GymInsurance";
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrdersData();
  }, []);

  function fetchOrdersData() {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return setIsLoading(false);

    axios
      .get(ordersUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setOrdersData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error fetching orders:", error);
      });
  }

  const getGymNameById = (gymId) => {
    const gym = gyms.find((g) => g.gymId === gymId); 
    return gym ? gym.gymName : "NA"; 
  };

  if (!gyms) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Order ID</TableCell>
                <TableCell>Gym Name</TableCell>
                <TableCell align="right">Insurance IDs</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell align="right">Premium Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersData.map((order) => (
                <OrderRow
                  key={order.giId}
                  order={order}
                  gymName={getGymNameById(order.gymId)} 
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
