import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LoadingAndErrorState from "../states/LoadingAndErrorState";
import { addToCart } from "../../utils/cart/Cart"; 
import "./IndividualPlan.css";

export default function IndividualPlan() {
  const { planId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const gymIds = queryParams.get('gymId') ? queryParams.get('gymId').split(',') : [];

  const url = `http://localhost:5125/api/v1/InsurancePlan/${planId}`;

  useEffect(() => {
    function getData() {
      axios
        .get(url)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
    getData();
  }, [url]);

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [
      ...currentCart,
      { gymId: gymIds, planId: product.insuranceId, planName: product.planName }
    ];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.planName} added to cart`);
  };

  if (loading || error) {
    return <LoadingAndErrorState loading={loading} error={error} />;
  }

  if (!product) {
    return null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
      <div style={{ maxWidth: "345px", width: "100%", margin: "0 auto" }}>
        <Card sx={{ maxWidth: 345 }} className="card">
          <CardContent>
          <Typography variant="h5" gutterBottom>
                  {product.planName}
                </Typography>
            <Chip label={product.monthlyPremium} variant="outlined" color="primary"/>
            <Typography variant="body2" color="secondary">
              {product.coverageType}
            </Typography>
            <Typography variant="body2">
              Coverage Details:
              <ul>
                {product.coverageDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 2 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
