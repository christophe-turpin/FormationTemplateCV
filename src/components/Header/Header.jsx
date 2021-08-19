import React, { useEffect, useState } from "react";
import "./header.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPowerOff } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [resumeData, setResumeData] = useState({});
  const getHeader = () => {
    axios
      .get(
        `http://localhost:3000/api/header/${
          JSON.parse(localStorage.currentToken)._id
        }`
      )
      .then((response) => {
        setResumeData({ ...resumeData, header: response.data });
      });
  };

  const putHeader = (e) => {
    switch (e) {
      case "name":
        axios
          .put(`http://localhost:3000/api/header/${resumeData.header._id}`, {
            ...resumeData.header,
            name:
              prompt("Modifier le champ: Prénom et Nom ?")?.toString() ||
              resumeData.header.name,
          })
          .then(() => getHeader());
        break;
      case "job":
        axios
          .put(`http://localhost:3000/api/header/${resumeData.header._id}`, {
            ...resumeData.header,
            job:
              prompt("Modifier le champ: Poste ?")?.toString() ||
              resumeData.header.job,
          })
          .then(() => getHeader());
        break;
      case "phone":
        axios
          .put(`http://localhost:3000/api/header/${resumeData.header._id}`, {
            ...resumeData.header,
            phone:
              prompt("Modifier le champ: Numéro de téléphone ?")?.toString() ||
              resumeData.header.phone,
          })
          .then(() => getHeader());
        break;
      case "mail":
        axios
          .put(`http://localhost:3000/api/header/${resumeData.header._id}`, {
            ...resumeData.header,
            mail:
              prompt("Modifier le champ: Adresse email ?")?.toString() ||
              resumeData.header.mail,
          })
          .then(() => getHeader());
        break;
      case "portfolio":
        axios
          .put(`http://localhost:3000/api/header/${resumeData.header._id}`, {
            ...resumeData.header,
            portfolio:
              prompt("Modifier le champ: Url du portfolio ?")?.toString() ||
              resumeData.header.portfolio,
          })
          .then(() => getHeader());
        break;
      default:
        break;
    }
  };

  const logOut = () => {
    localStorage.removeItem("currentToken");
    window.location.reload(false);
  };
  useEffect(() => {
    getHeader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="header row">
      <div className="col-6 text-center" id="hleft">
        <h1 id="name">
          {resumeData.header?.name || "No data"} {"   "}
          <FontAwesomeIcon
            onClick={() => putHeader("name")}
            icon={faPencilAlt}
            className="putIcon"
            size="sm"
          />
          <FontAwesomeIcon
            onClick={logOut}
            icon={faPowerOff}
            className="putIcon"
            size="sm"
          />
        </h1>
        <br />
        <h3 id="job">
          {resumeData.header?.job || "No data"} {"   "}
          <FontAwesomeIcon
            onClick={() => putHeader("job")}
            icon={faPencilAlt}
            className="putIcon"
            size="sm"
          />
        </h3>
      </div>
      <div className="col-5 text-right" id="hright">
        <br />
        <h4 id="phone">
          {resumeData.header?.phone || "No data"} {"   "}
          <FontAwesomeIcon
            onClick={() => putHeader("phone")}
            icon={faPencilAlt}
            className="putIcon"
            size="sm"
          />
        </h4>
        <h4 id="mail">
          {resumeData.header?.mail || "No data"} {"   "}
          <FontAwesomeIcon
            onClick={() => putHeader("mail")}
            icon={faPencilAlt}
            className="putIcon"
            size="sm"
          />
        </h4>
        <h4 id="portfolio">
          {resumeData.header?.portfolio || "No data"} {"   "}
          <FontAwesomeIcon
            onClick={() => putHeader("portfolio")}
            icon={faPencilAlt}
            className="putIcon"
            size="sm"
          />
        </h4>
      </div>
    </div>
  );
}

export default Header;
