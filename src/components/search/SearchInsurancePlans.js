import React, { useState } from "react";
import { TextField, List, ListItem, ListItemText, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './SearchInsurancePlans.css';

export default function SearchInsurancePlans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 0) {
      try {
        const response = await fetch(
          `https://gym-insurance-marketplace-backend.onrender.com/api/v1/InsurancePlan/name?coverageType=${encodeURIComponent(query)}`
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Error fetching search results:", response.statusText);
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleItemClick = (insuranceId) => {
    navigate(`plans/${insuranceId}`);
  };

  return (
    <div className="search-container">
      <TextField
        variant="outlined"
        placeholder="Search Plans"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
        sx={{
          '& .MuiInputBase-input': {
            color: '#1D1A05', 
          },
        }}
      />

      {results.length > 0 && (
        <Paper className="results-container">
          <List>
            {results.map((result) => (
              <ListItem 
                key={result.insuranceId} 
                button 
                onClick={() => handleItemClick(result.insuranceId)}
              >
                <ListItemText
                  primary={`${searchTerm} > ${result.planName}`}
                  secondary={result.coverageType}
                  sx={{
                    color: "#1D1A05", 
                    '& .MuiListItemText-secondary': {
                      color: "#92140C", 
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}
