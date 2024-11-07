import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      <h5>Register!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={formData.firstName}
          placeholder="First Name"
          name="firstName"
          required
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.lastName}
          placeholder="Last Name"
          name="lastName"
          required
        />
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
        <button className="waves-effect waves-light #ff5252 red accent-2  btn-small">
          <i className="material-icons left">control_point</i>Register
        </button>
        <Link to="/login">
          <p>Already have an Account? </p>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
