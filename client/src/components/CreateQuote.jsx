import React, { useState } from "react";

const CreateQuote = () => {
  const [quote, setQuote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Quote: " + quote);
    setQuote("");
  }

  return (
    <div className="container">
      <h4>Create a New Quote Here!</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Enter a New Quote...."
        />
        <button
          type="submut"
          className="waves-effect waves-light #ff5252 red accent-2  btn-small"
        >
          <i className="material-icons left">create</i> Create Quote
        </button>
      </form>
    </div>
  );
};

export default CreateQuote;
