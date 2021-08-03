import axios from "axios";
import React, { useEffect, useState } from "react";
import "./comp.css";

function Comp() {
  const [resumeData, setResumeData] = useState({});
  const getComp = () => {
    axios
      .get("http://localhost:3000/api/competences")
      .then((response) =>
        setResumeData({ ...resumeData, comp: response.data })
      );
  };

  useEffect(() => {
    getComp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section id="competences" className="col-12">
      <h1 className="title">Compétences</h1>
      <div className="row comp">
        <div className=" col-6 text-left">
          <h4>Compétences techniques</h4>
          <ul>
            {resumeData.comp?.hard.length > 0 ? (
              resumeData.comp?.hard.map((comp) => (
                <li key={comp.id}>
                  <h5>{comp.name || "No data"}</h5>
                  <p>{comp.description || "No data"}</p>
                </li>
              ))
            ) : (
              <h1>No data</h1>
            )}
          </ul>
        </div>
        <div className=" col-6 text-left">
          <h4>Compétences générales</h4>
          <ul>
            {resumeData.comp?.soft.length > 0 ? (
              resumeData.comp?.soft.map((comp) => (
                <li key={comp.id}>
                  <h5>{comp.name || "No data"}</h5>
                  <p>{comp.description || "No data"}</p>
                </li>
              ))
            ) : (
              <h1>No data</h1>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Comp;
