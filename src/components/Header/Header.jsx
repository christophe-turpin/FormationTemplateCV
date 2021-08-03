import React, { useEffect, useState } from "react";
import "./header.css";
import axios from "axios";

function Header() {
  const [resumeData, setResumeData] = useState({});
  const getHeader = () => {
    axios
      .get("http://localhost:3000/api/header")
      .then((response) =>
        setResumeData({ ...resumeData, header: response.data })
      );
  };

  useEffect(() => {
    getHeader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="header row">
      <div className="col-6 text-center" id="hleft">
        <h1 id="name">{resumeData.header?.name || "No data"}</h1>
        <br />
        <h3 id="job">{resumeData.header?.job || "No data"}</h3>
      </div>
      <div className="col-5 text-right" id="hright">
        <br />
        <h4 id="phone">{resumeData.header?.phone || "No data"}</h4>
        <h4 id="mail">{resumeData.header?.mail || "No data"}</h4>
        <h4 id="portfolio">{resumeData.header?.portfolio || "No data"}</h4>
      </div>
    </div>
  );
}

export default Header;
