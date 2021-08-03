import axios from "axios";
import React, { useEffect, useState } from "react";
import "./form.css";

function Form() {
  const [resumeData, setResumeData] = useState({});
  const getForm = () => {
    axios
      .get("http://localhost:3000/api/formation")
      .then((response) =>
        setResumeData({ ...resumeData, form: response.data })
      );
  };

  useEffect(() => {
    getForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section id="formations" className="col-12">
      <h1 className="title">Formations</h1>
      <ul id="formationsList">
        {resumeData.form?.length > 0 ? (
          resumeData.form?.map((form) => (
            <li className="row formation text-left" key={form.id}>
              <div className="col-3 text-left">
                <h4>{form.date || "No data"}</h4>
                <h6>{form.school || "No data"}</h6>
              </div>
              <div className="col-9 text-left">
                <h5>{form.title || "No data"}</h5>
                <p>{form.description || "No data"}</p>
              </div>
            </li>
          ))
        ) : (
          <h1>"No data"</h1>
        )}
      </ul>
    </section>
  );
}

export default Form;
