// Feed: Real-time chronological feed of all listings
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ListingCard from "./ListingCard";
import { Typography, Box } from "@mui/material";

export default function Feed() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Listen for real-time updates from Firestore
    const q = query(collection(db, "listings"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setListings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#388e3c", fontWeight: "bold" }}>
        Real-time Feed
      </Typography>
      {listings.length === 0 ? (
        <Typography sx={{ color: "#888", textAlign: "center" }}>
          No listings yet. Be the first to post!
        </Typography>
      ) : (
        listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      )}
    </Box>
  );
}
