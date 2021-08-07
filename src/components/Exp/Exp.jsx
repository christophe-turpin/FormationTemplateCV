import axios from "axios";
import React, { useEffect, useState } from "react";
import "./exp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function Exp() {
  const [DevExp, setDevExp] = useState([]);
  const [NoDevExp, setNoDevExp] = useState([]);
  const getExp = () => {
    axios
      .get("http://localhost:3000/api/experience/devexp")
      .then((response) => setDevExp([...response.data]));
    axios
      .get("http://localhost:3000/api/experience/nodevexp")
      .then((response) => setNoDevExp([...response.data]));
  };

  const addDevExp = () => {
    DevExp?.length < 4 &&
      axios
        .post("http://localhost:3000/api/experience/devexp", {
          name: prompt("Nom du projet ou de l'entreprise")?.toString(),
          description: prompt("Description du poste")?.toString(),
          type: prompt("Type de projet ou d'expérience")?.toString(),
          stack: prompt(
            "Tâches effectuées et compétences utilisées pour ce métier"
          )?.toString(),
          date: prompt("Date du projet ou de l'expérience")?.toString(),
        })
        .then(() => getExp())
        .catch((error) => console.log(error));
  };

  const addNoDevExp = () => {
    NoDevExp?.length < 4 &&
      axios
        .post("http://localhost:3000/api/experience/nodevexp", {
          theme: prompt("Nom du secteur ou de l'entreprise")?.toString(),
          description: prompt("Description du poste")?.toString(),
          job: prompt("Intitulé du poste")?.toString(),
          realization: prompt(
            "Technos et compétences utilisées pour ce projets"
          )?.toString(),
          date: prompt("Date du projet ou de l'expérience")?.toString(),
        })
        .then(() => getExp())
        .catch((error) => console.log(error));
  };

  const putDevExp = (e) => {
    axios
      .put(`http://localhost:3000/api/experience/devexp/${e._id}`, {
        name: prompt("Nom du projet ou de l'entreprise")?.toString() || e.name,
        description:
          prompt("Description du poste")?.toString() || e.description,
        type: prompt("Type de projet ou d'expérience")?.toString() || e.type,
        stack:
          prompt(
            "Technos et compétences utilisées pour ce projets"
          )?.toString() || e.stack,
        date: prompt("Date de la formation")?.toString() || e.date,
      })
      .then(() => getExp())
      .catch((error) => console.log(error));
  };

  const putNoDevExp = (e) => {
    axios
      .put(`http://localhost:3000/api/experience/nodevexp/${e._id}`, {
        theme:
          prompt("Nom du secteur ou de l'entreprise")?.toString() || e.theme,
        description:
          prompt("Description du poste")?.toString() || e.description,
        job: prompt("Intitulé du poste")?.toString() || e.job,
        realization:
          prompt(
            "Technos et compétences utilisées pour ce projets"
          )?.toString() || e.realization,
        date: prompt("Date du projet ou de l'expérience")?.toString() || e.date,
      })
      .then(() => getExp())
      .catch((error) => console.log(error));
  };

  const delDevExp = (e) => {
    axios
      .delete(`http://localhost:3000/api/experience/devexp/${e._id}`)
      .then(() => getExp())
      .catch((error) => console.log(error));
  };

  const delNoDevExp = (e) => {
    axios
      .delete(`http://localhost:3000/api/experience/nodevexp/${e._id}`)
      .then(() => getExp())
      .catch((error) => console.log(error));
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
          <h4>
            Développement depuis{" "}
            {(DevExp?.length > [0] && DevExp[0].date) || "peu"}{" "}
            {DevExp?.length < 4 && (
              <FontAwesomeIcon
                onClick={() => addDevExp()}
                icon={faPlus}
                className="addIcon"
                size="sm"
              />
            )}
          </h4>
        </li>
        <div className="row devExp">
          {DevExp?.length > 0 ? (
            DevExp?.map((e) => (
              <div className="row exp" key={e._id}>
                <div className="icons">
                  <FontAwesomeIcon
                    onClick={() => putDevExp(e)}
                    icon={faPencilAlt}
                    size="sm"
                  />
                  <FontAwesomeIcon
                    onClick={() => delDevExp(e)}
                    icon={faTrashAlt}
                    size="sm"
                  />
                </div>
                {"  "}
                <div>
                  <h4>{e.name || "No data"}</h4>
                  <h5>{e.type || "No data"}</h5>
                  <p>{e.description || "No data"}</p>
                  <span>{e.stack || "No data"}</span>
                </div>
              </div>
            ))
          ) : (
            <h1>No data</h1>
          )}
        </div>
        <li className="row experience text-left">
          <h4>
            Autres expériences{" "}
            {NoDevExp?.length < 4 && (
              <FontAwesomeIcon
                onClick={() => addNoDevExp()}
                icon={faPlus}
                className="addIcon"
                size="sm"
              />
            )}
          </h4>
        </li>
        <div className="row nodevExp">
          {NoDevExp?.length > 0 ? (
            NoDevExp?.map((e) => (
              <div key={e._id} className=" row exp">
                <div className="icons">
                  <FontAwesomeIcon
                    onClick={() => putNoDevExp(e)}
                    icon={faPencilAlt}
                    size="sm"
                  />
                  <FontAwesomeIcon
                    onClick={() => delNoDevExp(e)}
                    icon={faTrashAlt}
                    size="sm"
                  />
                </div>
                {"  "}
                <div>
                  <h4>{e.date || "No data"}</h4>
                  <h6>{e.theme || "No data"}</h6>
                  <h5>{e.job || "No data"}</h5>
                  <p>{e.description || "No data"}</p>
                  <span>{e.realization || "No data"}</span>
                </div>
              </div>
            ))
          ) : (
            <h1>No data</h1>
          )}
        </div>
      </ul>
    </section>
  );
}

export default Exp;
