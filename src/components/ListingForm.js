// ListingForm: Form for farmers/buyers to create a new post
import React, { useState } from "react";
import { TextField, Button, Box, Typography, InputAdornment } from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Helper: get label and icon for produce
const getProduceIcon = (produce) => {
  // Use emoji for simplicity; replace with MUI icons if desired
  const icons = {
    tomato: "🍅",
    avocado: "🥑",
    onion: "🧅",
    potato: "🥔",
    cabbage: "🥬",
    banana: "🍌",
    maize: "🌽"
  };
  const key = produce.toLowerCase();
  return icons[key] || "🥕";
};

export default function ListingForm({ isBuying }) {
  const [produceName, setProduceName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "listings"), {
        produceName,
        quantity,
        location,
        contactNumber,
        imageURL,
        isBuying,
        timestamp: serverTimestamp()
      });
      setProduceName("");
      setQuantity("");
      setLocation("");
      setContactNumber("");
      setImageURL("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      alert("Error posting listing. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, color: isBuying ? "#1976d2" : "#388e3c" }}>
        {isBuying ? "Buyer Request" : "Farmer Listing"}
      </Typography>
      <TextField
        label={isBuying ? "Produce Needed" : "Produce Name"}
        value={produceName}
        onChange={e => setProduceName(e.target.value)}
        required
        fullWidth
        sx={{ mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {getProduceIcon(produceName)}
            </InputAdornment>
          )
        }}
      />
      <TextField
        label={isBuying ? "Quantity Needed" : "Quantity Available"}
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        required
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Location/District"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Contact Number"
        value={contactNumber}
        onChange={e => setContactNumber(e.target.value)}
        required
        fullWidth
        sx={{ mb: 1 }}
        type="tel"
      />
      <TextField
        label="Photo URL (optional)"
        value={imageURL}
        onChange={e => setImageURL(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color={isBuying ? "primary" : "success"}
        fullWidth
        disabled={loading}
        sx={{ fontWeight: "bold", fontSize: "1rem", py: 1 }}
      >
        {loading ? "Posting..." : isBuying ? "Post Request" : "Post Listing"}
      </Button>
      {success && (
        <Typography sx={{ color: "#388e3c", mt: 1, fontWeight: "bold" }}>
          Posted!
        </Typography>
      )}
    </Box>
  );
}
