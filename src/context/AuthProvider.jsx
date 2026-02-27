/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.jsx
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

import { apiFetch, configureApiFetch } from "../api/apiFetch";
import toast from "react-hot-toast";

const AuthContext = createContext(undefined);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await apiFetch("/auth/me");

      // Look for response.success or response.instituteMember instead of response.user
      if (response && response.success && response.instituteMember) {
        // Return a combined object so your app has all the info it needs
        return {
          ...response.instituteMember,
          instituteDetails: response.institute
        };
      }
      return null;
    } catch (error) {
      console.error("AuthContext: Failed to fetch user details", error);
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    // 1. Check if we actually have a token before trying to log out via API
    const existingToken = localStorage.getItem("token");

    // 2. Clear state and storage immediately
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userName");


    // 3. Only ping the server if there was a token to invalidate
    if (existingToken) {
      try {
        const response = await apiFetch("/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${existingToken}`
          }
        });
        if (response.success) {
          toast.success(response.message, { id: "logout-toast" });
        }
      } catch (error) {
        console.error("Failed to invalidate token on server:", error);
      }
    }


  }, []);

  // Add the empty dependency array (or fetchAllUsers) to the end
  const getNewUserDetails = useCallback(async () => {
    const fetchedUser = await fetchAllUsers();

    if (fetchedUser) {
      setUser(fetchedUser);
      localStorage.setItem("userName", fetchedUser.portalUsername);
    }
  }, [fetchAllUsers]); // <-- Add this array


  const setTokenAndFetchUser = useCallback(
    async (newToken) => {
      setIsLoading(true);
      localStorage.setItem("token", newToken);
      setToken(newToken);

      const fetchedUser = await fetchAllUsers();

      if (fetchedUser) {
        setUser(fetchedUser);
        localStorage.setItem("userName", fetchedUser.portalUsername);
      } else {
        logout();
      }

      setIsLoading(false);
    },
    [logout, fetchAllUsers]
  );

  useEffect(() => {
    configureApiFetch(logout);
  }, [logout]);

  useEffect(() => {
    const verifyExistingToken = async () => {
      setIsLoading(true);
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        const fetchedUser = await fetchAllUsers();
        if (fetchedUser) {
          setUser(fetchedUser);
          setToken(storedToken);
        } else {
          logout();
        }
      } else {
        // DO NOT call logout() here. The user is already logged out.
        // Just make sure state is clean.
        setUser(null);
        setToken(null);
      }

      setIsLoading(false);
    };

    verifyExistingToken();
  }, [logout, fetchAllUsers]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setTokenAndFetchUser,
        logout,
        isLoading,
        getNewUserDetails,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
