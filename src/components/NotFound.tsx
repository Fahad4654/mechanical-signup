import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        p: 3,
        gap: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 3,
          gap: 2,
        }}
      >
        <Button variant="contained" size="large" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button variant="outlined" size="large" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    </Box>
  );
};
