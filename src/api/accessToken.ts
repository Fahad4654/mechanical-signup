import { refreshAccessToken } from "./refreshToken";

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem("accessToken");
  
  // Set up initial request
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  let response = await fetch(url, requestOptions);

  // If token expired, try to refresh it
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();
      requestOptions.headers = {
        ...requestOptions.headers,
        "Authorization": `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, requestOptions);
    } catch (error) {
      // Redirect to login if refresh fails
      window.location.href = "/login";
      throw error;
    }
  }

  return response;
};