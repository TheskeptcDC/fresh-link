// ListingCard: Displays a single listing in the feed
import React from "react";
import { Card, CardContent, Typography, Box, Button, CardMedia } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Helper: get icon for produce
const getProduceIcon = (produce) => {
  const icons = {
    tomato: "🍅",
    avocado: "🥑",
    onion: "🧅",
    potato: "🥔",
    cabbage: "🥬",
    banana: "🍌",
    maize: "🌽"
  };
  const key = produce?.toLowerCase();
  return icons[key] || "🥕";
};

export default function ListingCard({ listing }) {
  const { produceName, quantity, location, contactNumber, imageURL, isBuying, timestamp } = listing;

  // WhatsApp link
  const whatsappLink = `https://wa.me/${contactNumber.replace(/[^\d]/g, "")}`;
  // Phone link
  const phoneLink = `tel:${contactNumber}`;

  return (
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2, bgcolor: isBuying ? "#e3f2fd" : "#e8f5e9" }}>
      {imageURL && (
        <CardMedia
          component="img"
          height="140"
          image={imageURL}
          alt={produceName}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mr: 1 }}>
            {getProduceIcon(produceName)}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {produceName}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          <strong>Quantity:</strong> {quantity}
        </Typography>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          <strong>Location:</strong> {location}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<LocalPhoneIcon />}
            href={phoneLink}
            sx={{ fontWeight: "bold" }}
          >
            Call
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<WhatsAppIcon />}
            href={whatsappLink}
            sx={{ fontWeight: "bold" }}
            target="_blank"
          >
            WhatsApp
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
