import React from "react";

const Profile = () => {
  return (
    <div className="container">
      <h4>Profile</h4>
      <div className="center-align">
        <img
          className="circle"
          src="https://robohash.org/ram.png?bgset=bg1"
          alt="pic"
        />
        <h5>Ramesh Verma</h5>
        <h6>Email - abc@abc.com</h6>
      </div>
      <blockquote>
        <h6>If it works don;t touch it.</h6>
      </blockquote>
      <blockquote>
        <h6>If it works don;t touch it.</h6>
      </blockquote>
    </div>
  );
};

export default Profile;
