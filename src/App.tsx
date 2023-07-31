import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.scss"; // Import the CSS styles

const RedirectionPage = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttonMessage, setButtonMessage] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [imgUrl, setImageUrl] = useState("/maintenance.jpg");

  useEffect(() => {
    // Fetch the maintenance message from the JSON file
    fetch("/message.json")
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setSubTitle(data.subTitle);
        setMessage(data.message);
        setButtonMessage(data.button.message);
        setButtonShow(data.button.show);
        setRedirectUrl(data.button.redirectUrl);
        setImageUrl(data.background.url);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });
  }, []);

  return (
    <div className="container" style={{ backgroundImage: `url(${imgUrl})` }}>
      <div>
        <h1 className="title">{title}</h1>
        <h2 className="sub-title">{subTitle}</h2>
        <p className="message">{message}</p>
        <br />
        <br />
        {buttonShow && (
          <a className="button" href={redirectUrl}>
            {buttonMessage}
          </a>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
