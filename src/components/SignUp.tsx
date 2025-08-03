import { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

export const SignUp = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    console.log(name, rePassword, email, phoneNumber);

    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{11}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Must be 11 digits (e.g., 01712345678)";
    return "";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
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
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
        >
          Sign Up
        </Typography>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2, // Add margin bottom
            }}
          >
            {error}
          </Alert>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* <form ref={formRef}> */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ mb: 2 }}
              autoComplete="name"
              slotProps={{
                input: {
                  autoCapitalize: "none",
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              autoComplete="email"
              slotProps={{
                input: {
                  autoCapitalize: "none",
                },
              }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                setPhoneNumber(value);
                setPhoneError(validatePhoneNumber(value)); // Validate on change
              }}
              error={!!phoneError} // Turns red if error
              helperText={phoneError} // Shows error message
              required
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  autoCapitalize: "none",
                  inputMode: "numeric", // Shows numeric keyboard on mobile
                  startAdornment: (
                    <InputAdornment variant="outlined" position="start">
                      +88
                    </InputAdornment>
                  ),
                },
                htmlInput: { maxLength: 11 }, // Limits input to 10 digits
              }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Re-type Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
                if (e.target.value !== password) {
                  setPasswordError("Passwords do not match");
                } else {
                  setPasswordError("");
                }
              }}
              error={!!passwordError}
              helperText={passwordError}
              required
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            disabled={isLoading}
            sx={{
              py: 1.5,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
