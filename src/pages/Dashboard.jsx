import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login"); // Redirect to login if token is not available
          return;
        }

        // Make the GET request to fetch user profile data
        const response = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        // Set the user data
        setUser(response.data);
      } catch (err) {
        setError("Error fetching profile, please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [history]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="dashboard-container p-6">
      <h2 className="text-2xl font-bold">Welcome to Your Dashboard</h2>
      <div className="user-info mt-4">
        <p className="text-lg">Username: {user?.username}</p>
        <p className="text-lg">Email: {user?.email}</p>
        <p className="text-lg">Gender: {user?.gender}</p>
      </div>
      <div className="mt-6">
        <button
          onClick={() => {
            localStorage.removeItem("token"); // Remove the token from localStorage
            history.push("/login"); // Redirect to login
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
