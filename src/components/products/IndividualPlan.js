import { React } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import LoadingAndErrorState from "../states/LoadingAndErrorState";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./IndividualPlan.css";

export default function IndividualPlan() {
  const params = useParams();
  const productId = params.planId;
  const url = `http://localhost:5125/api/v1/InsurancePlan/${productId}`;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function getData() {
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
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

   // Display loading and error states using LoadingAndErrorState component
   if (loading || error) {
    return <LoadingAndErrorState loading={loading} error={error} />;
  }

  // Prevent rendering if product data is still null
  if (!product) {
    return null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
      <div style={{ maxWidth: "345px", width: "100%", margin: "0 auto" }}>
        <Card sx={{ maxWidth: 345 }} className="card">
          <CardActionArea>
            {/* <CardMedia
              component="img"
              sx={{ height: 450, objectFit: "cover" }}
              image={product.image}
              alt={product.title}
            /> */}
            <CardContent>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "30px" }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {product.planName}
                </Typography>
                <Chip
                  key={productId}
                  label={product.monthlyPremium}
                  variant="outlined"
                />
              </div>
              <Typography variant="body2" color="text.secondary">
                {product.coverageType}
              </Typography>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "95px" }}
              >
                {/* <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${product.price}
                </Typography> */}
                <Typography variant="body2">
                  Coverage Details:
                  <ul>
                    {product.coverageDetails.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </Typography>
                <Button variant="contained" color="primary" sx={{ m: 2 }}>
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
