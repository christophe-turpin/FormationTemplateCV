import axios from "axios";
import React, { useEffect, useState } from "react";
import "./exp.css";

function Exp() {
  const [resumeData, setResumeData] = useState({});
  const getExp = () => {
    axios
      .get("http://localhost:3000/api/experience")
      .then((response) => setResumeData({ ...resumeData, exp: response.data }));
  };

  useEffect(() => {
    getExp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section id="experiences" className="col-12">
      <h1 className="title">Expériences</h1>
      <ul id="experiencesList">
        <li className="row experience text-left">
          <h4>{resumeData.exp?.begin || "No data"} - Aujourd'hui</h4>
        </li>
        <div className="row devExp">
          {resumeData.exp?.dev.length > 0 ? (
            resumeData.exp?.dev.map((e) => (
              <div key={e.id} className="exp">
                <h4>{e.name || "No data"}</h4>
                <h5>{e.type || "No data"}</h5>
                <p>{e.description || "No data"}</p>
                <span>{e.stack || "No data"}</span>
              </div>
            ))
          ) : (
            <h1>No data</h1>
          )}
        </div>
        <li className="row experience text-left" />
        <div className="row nodevExp">
          {resumeData.exp?.noDev.length > 0 ? (
            resumeData.exp?.noDev.map((e) => (
              <div key={e.id} className="exp">
                <h4>{e.date || "No data"}</h4>
                <h6>{e.theme || "No data"}</h6>
                <h5>{e.job || "No data"}</h5>
                <p>{e.description || "No data"}</p>
                <span>{e.realization || "No data"}</span>
              </div>
            ))
          ) : (
            <h1> No data</h1>
          )}
        </div>
      </ul>
    </section>
  );
}

export default Exp;
