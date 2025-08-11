// Main App component for Lusaka Fresh Link MVP
import React, { useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import Feed from "./components/Feed";
import ListingForm from "./components/ListingForm";

// App: Root component
export default function App() {
  // Track whether user is posting as Farmer or Buyer
  const [isBuying, setIsBuying] = useState(false);

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", padding: 0 }}>
      <Box sx={{ py: 2, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#388e3c", mb: 1 }}>
          Lusaka Fresh Link
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#555", mb: 2 }}>
          Real-time Market Board for Farmers & Buyers
        </Typography>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <button
              style={{
                fontSize: "1.1rem",
                padding: "8px 16px",
                background: !isBuying ? "#388e3c" : "#fff",
                color: !isBuying ? "#fff" : "#388e3c",
                border: "2px solid #388e3c",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => setIsBuying(false)}
            >
              Farmer
            </button>
            <button
              style={{
                fontSize: "1.1rem",
                padding: "8px 16px",
                background: isBuying ? "#388e3c" : "#fff",
                color: isBuying ? "#fff" : "#388e3c",
                border: "2px solid #388e3c",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => setIsBuying(true)}
            >
              Buyer
            </button>
          </Box>
          <ListingForm isBuying={isBuying} />
        </Paper>
        <Feed />
      </Box>
    </Container>
  );
}
