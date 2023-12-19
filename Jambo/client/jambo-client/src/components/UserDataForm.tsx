// src/components/UserProfileForm.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserProfileForm: React.FC = () => {
  const [userData, setUserData] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Fetch user data from the server
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          // Include the 'auth' cookie in the request headers
          Cookie: document.cookie,
          jwt: "",
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserData(user);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch user data on component mount

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include the 'auth' cookie in the request headers
          Cookie: document.cookie,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User data updated successfully");
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "DELETE",
        // Include the 'auth' cookie in the request headers
        headers: {
          Cookie: document.cookie,
        },
      });

      if (response.ok) {
        console.log("User account deleted successfully");
        // You might want to redirect or perform other actions after deletion
      } else {
        console.error("Failed to delete user account");
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h2>User Profile</h2>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
      <div>
        <button onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
};

export default UserProfileForm;
