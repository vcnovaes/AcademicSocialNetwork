// src/components/UserProfileForm.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { IUserRequest, UserClient } from "../clients/UserClient";
import { useNavigate } from "react-router-dom";

const UserProfileForm: React.FC = () => {
  const navigate = useNavigate();
  let [userData, setUserData] = useState<IUserRequest>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Fetch user data from the server
  const fetchUserData = async () => {
    try {
      if (
        localStorage.getItem("user_id") == null ||
        localStorage.getItem("JamboAuthCookie") == null
      ) {
        throw new Error("Credential not found");
      }
      const response = await UserClient.get(
        localStorage.getItem("user_id") ?? "",
        localStorage.getItem("JamboAuthCookie") ?? ""
      );

      if (response != undefined) {
        const user = response;
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
      console.log(userData);
      const response = await UserClient.update(
        userData,
        localStorage.getItem("user_id") ?? "",
        localStorage.getItem("JamboAuthCookie") ?? ""
      );
      console.info(response);
      userData = response;
      if (response != undefined) {
        console.log("User data updated successfully");
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleSeePosts = async () => {
    navigate("/posts");
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
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
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
        <button onClick={handleSeePosts}>See Posts</button>
      </div>
    </div>
  );
};

export default UserProfileForm;
