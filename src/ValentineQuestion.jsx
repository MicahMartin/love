import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const containerSx = {
  backgroundColor: "#ffebee", // Light pink background
  padding: "40px",
  borderRadius: "10px",
  marginLeft: "10px",
  marginRight: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
}
const buttonContainerSx = {
  display: "flex",
  justifyContent: "center", // Centers the buttons within the container
  gap: "10px", // Adds spacing between buttons
  marginTop: "20px",
  alignItems: "flex-end"
};

const buttonSx = {
  width: "39%", // Each button takes up 40% of the container (total 80% with gap)
  height: "12vh",
  fontSize: "3.2rem",
  textTransform: "none"
};

const yesResponseArray = [
  "yes",
  "still no",
  "my heart tho",
  "dam bb gr u fr??",
  "click no one more time ill blow this sht up"
];

const noResponseArray = [
  "no",
  "still no",
  "nopeeee",
  "do it i dare u",
];

const promptArray = [
  "will u be my valentine Zavi 💖",
  "reconsider ill eat ya butt",
  "i will buy u a real hello kitty",
  "say no again ima blow ths sht up",
];

function ValentineQuestion({ onYesClick, onNoClick, noCount }) {

  return (
    <Box sx={containerSx}>
      <Typography variant="h4" gutterBottom sx={{ color: "#d32f2f" }}>
        {promptArray[noCount]}
      </Typography>
      <Box sx={buttonContainerSx}>
        <Button
          variant="contained"
          color="success"
          onClick={onYesClick}
          sx={buttonSx}
        >
          Yes!
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ ...buttonSx, height: "8vh", fontSize: "1rem", marginBottom: ".5rem" }}
          onClick={onNoClick}
        >
          {noResponseArray[noCount]}
        </Button>
      </Box>
    </Box>
  );
}

export default ValentineQuestion;
