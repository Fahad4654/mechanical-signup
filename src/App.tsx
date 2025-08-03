import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import Dashboard from "./components/Dashboard";
import { NotFound } from "./components/NotFound";
import { SignUp } from "./components/SignUp";
import Layout from "./components/commons/Layout";
import CircleSpinner from "./components/CircleSpinner"; // You'll need to create this

function App() {
  const [isBackendHealthy, setIsBackendHealthy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await fetch(
          `https://express-ts-api-fhcn.onrender.com/health`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "UP") {
            setIsBackendHealthy(true);
          }
        }
      } catch (error) {
        console.error("Backend health check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBackendHealth();
  }, []);

  if (isLoading) {
    return <CircleSpinner />;
  }

  if (!isBackendHealthy) {
    return (
      <div className="backend-error">
        <h1>Backend Service Unavailable</h1>
        <p>
          We're having trouble connecting to our servers. Please try again
          later.
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
