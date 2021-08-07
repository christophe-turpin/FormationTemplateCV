import axios from "axios";
import React, { useEffect, useState } from "react";
import "./form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function Form() {
  const [resumeData, setResumeData] = useState({});
  const getForm = () => {
    axios
      .get("http://localhost:3000/api/formation")
      .then((response) => setResumeData({ ...resumeData, form: response.data }))
      .catch((error) => console.log(error));
  };

  const addForm = () => {
    resumeData.form.length < 5 &&
      axios
        .post("http://localhost:3000/api/formation", {
          title: prompt("Titre de la formation")?.toString(),
          description: prompt("Description de la formation")?.toString(),
          school: prompt(
            "Ecole dans laquelle vous avez suivi la formation"
          )?.toString(),
          date: prompt("Date de la formation")?.toString(),
        })
        .then(() => getForm())
        .catch((error) => console.log(error));
  };

  const putForm = (e) => {
    axios
      .put(`http://localhost:3000/api/formation/${e._id}`, {
        title: prompt("Titre de la formation")?.toString() || e.title,
        description:
          prompt("Description de la formation")?.toString() || e.description,
        school:
          prompt(
            "Ecole dans laquelle vous avez suivi la formation"
          )?.toString() || e.school,
        date: prompt("Date de la formation")?.toString() || e.date,
      })
      .then(() => getForm())
      .catch((error) => console.log(error));
  };

  const delForm = (e) => {
    axios
      .delete(`http://localhost:3000/api/formation/${e._id}`)
      .then(() => getForm())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="formations" className="col-12">
      <h1 className="title">
        Formations{" "}
        {resumeData.form?.length < 5 && (
          <FontAwesomeIcon
            onClick={() => addForm()}
            icon={faPlus}
            className="addIcon"
            size="md"
          />
        )}
      </h1>

      <ul id="formationsList">
        {resumeData.form?.length > 0 ? (
          resumeData.form?.map((form) => (
            <li className="row formation text-left" key={form._id}>
              <div className="col-0 icons">
                <FontAwesomeIcon
                  onClick={() => putForm(form)}
                  icon={faPencilAlt}
                />
                <FontAwesomeIcon
                  onClick={() => delForm(form)}
                  icon={faTrashAlt}
                />
              </div>
              <div className="col-3 text-left">
                <h4>{form.date || "No data"}</h4>
                <h6>{form.school || "No data"}</h6>
              </div>
              <div className="col-8 text-left">
                <h5>{form.title || "No data"}</h5>
                <p>{form.description || "No data"}</p>
              </div>
            </li>
          ))
        ) : (
          <h1>No data</h1>
        )}
      </ul>
    </section>
  );
}

export default Form;
