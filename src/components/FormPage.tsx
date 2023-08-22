import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./Styles.css";

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const isPhoneNumberValid = /^\d{10}$/.test(phoneNumber) || phoneNumber === "";
  const isEmailValid = /\S+@\S+\.\S+/.test(email) || email === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data here if needed
    if (name && phoneNumber && email) {
      const userDetails = {
        name,
        phoneNumber,
        email,
      };

      if (!name) {
        alert("Please enter your name.");
        return;
      }

      if (!phoneNumber) {
        alert("Please enter your phone number.");
        return;
      }

      if (!isPhoneNumberValid) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }

      if (!email) {
        alert("Please enter your email address.");
        return;
      }

      if (!isEmailValid) {
        alert("Please enter a valid email address.");
        return;
      }

      // Save user details in localStorage
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      // Redirect to the second page
      navigate("/nextpage");
    }
  };

  return (
    <div className="form-container">
      <h1>Enter Your Details</h1>
      <form onSubmit={handleSubmit} className="form-page">
        <div className="text-field">
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="text-field">
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            error={!isPhoneNumberValid}
            helperText={
              !isPhoneNumberValid
                ? "Please enter a valid 10-digit phone number."
                : ""
            }
            required
          />
        </div>
        <div className="text-field">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid}
            helperText={
              !isEmailValid ? "Please enter a valid email address." : ""
            }
            required
          />
        </div>
        <div className="text-field">
          <Button type="submit" variant="contained" color="primary">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
