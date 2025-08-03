import React from "react";
import logo from "../assets/logo.png";
import "../App.css";
import { Box, Paper } from "@mui/material";

const CircleSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        bgcolor: "background.dfault",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div className="spinner-container">
          <div className="spinner">
            <img src={logo} alt="Logo" className="spinner-logo" />
          </div>
          <h1 className="loading-text">Loading...</h1>
          <p className="loading-text">Please wait</p>
        </div>
      </Paper>
    </Box>
  );
};

export default CircleSpinner;
