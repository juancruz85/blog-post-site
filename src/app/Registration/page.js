"use client";

import React, { useState } from "react";

const RegisterationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // need to make a proper api login registration
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-gloss"></div>

        <h1 className="login-title">Welcome</h1>

        <p className="login-subtitle">Register</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button className="ios-login-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterationPage;
