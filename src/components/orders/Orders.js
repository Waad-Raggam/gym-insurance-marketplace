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

function OrderRow({ order, gymName, insuranceData }) {
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
        <TableCell component="th" scope="row" sx={{ color: "black" }}>
          {order.giId}
        </TableCell>
        <TableCell sx={{ color: "black" }}>{gymName}</TableCell>
        <TableCell align="right" sx={{ color: "black" }}>
          {order.insuranceIds.length > 0 ? order.insuranceIds.join(", ") : "N/A"}
        </TableCell>
        <TableCell sx={{ color: "black" }}>
          {new Date(order.startDate).toLocaleDateString()}
        </TableCell>
        <TableCell sx={{ color: "black" }}>
          {new Date(order.endDate).toLocaleDateString()}
        </TableCell>
        <TableCell align="right" sx={{ color: "black" }}>
          ${order.premiumAmount}
        </TableCell>
        <TableCell sx={{ color: "black" }}>
          {order.isActive ? "Active" : "Inactive"}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: "black" }}>
                Insurance Plans
              </Typography>
              <Table size="small" aria-label="insurance-ids">
                <TableBody>
                  {order.insuranceIds.map((id, index) => {
                    const insurance = insuranceData[id]; 
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" sx={{ color: "black" }}>
                          {insurance?.planName || "Unknown"}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          ${insurance?.monthlyPremium || "N/A"}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          {insurance?.coverageType || "N/A"}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          <ul>
                            {insurance?.coverageDetails?.map((detail, idx) => (
                              <li key={idx}>{detail}</li>
                            )) || "N/A"}
                          </ul>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
  const { userData, gyms } = props;
  const ordersUrl = `http://localhost:5125/api/v1/GymInsurance/user/${userData?.userId}`;
  const insuranceUrl = `http://localhost:5125/api/v1/InsurancePlan`; 
  const [ordersData, setOrdersData] = useState([]);
  const [insuranceData, setInsuranceData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      fetchOrdersData();
      fetchInsuranceData();
    }
  }, [userData]);

  function fetchOrdersData() {
    setIsLoading(true);
    const userId = userData?.userId;
    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }
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

  function fetchInsuranceData() {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(insuranceUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const insuranceMap = response.data.reduce((acc, insurance) => {
          acc[insurance.insuranceId] = insurance;
          return acc;
        }, {});
        setInsuranceData(insuranceMap);
      })
      .catch((error) => {
        console.log("Error fetching insurance data:", error);
      });
  }

  const getGymNameById = (gymId) => {
    const gym = gyms.find((g) => g.gymId === gymId);
    return gym ? gym.gymName : "NA";
  };

  if (!gyms || isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
        Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ color: "black" }}>Order ID</TableCell>
              <TableCell sx={{ color: "black" }}>Gym Name</TableCell>
              <TableCell align="right" sx={{ color: "black" }}>
                Insurance IDs
              </TableCell>
              <TableCell sx={{ color: "black" }}>Start Date</TableCell>
              <TableCell sx={{ color: "black" }}>End Date</TableCell>
              <TableCell align="right" sx={{ color: "black" }}>
                Premium Amount
              </TableCell>
              <TableCell sx={{ color: "black" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData.map((order) => (
              <OrderRow
                key={order.giId}
                order={order}
                gymName={getGymNameById(order.gymId)}
                insuranceData={insuranceData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
