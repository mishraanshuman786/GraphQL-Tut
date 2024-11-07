import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <h5>Login!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="email"
          name="email"
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          value={formData.password}
          name="password"
        />
        <button className="waves-effect waves-light #ff5252 red accent-2 btn-small">
          <i className="material-icons left">account_circle</i>Login
        </button>
        <Link to="/signup">
          <p>Don't have an Account? </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
