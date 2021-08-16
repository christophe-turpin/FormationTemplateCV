import axios from "axios";
import React, { useEffect, useState } from "react";
import "./comp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function Comp() {
  const [HardSkills, setHardSkills] = useState([]);
  const [SoftSkills, setSoftSkills] = useState([]);
  const getComp = () => {
    axios
      .get("http://localhost:3000/api/competences/hard")
      .then((response) => setHardSkills([...response.data]))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:3000/api/competences/soft")
      .then((response) => setSoftSkills([...response.data]))
      .catch((error) => console.log(error));
  };

  const addHardSkill = () => {
    HardSkills?.length < 3 &&
      axios
        .post("http://localhost:3000/api/competences/hard", {
          name: prompt("Nom de la compétence")?.toString(),
          description: prompt("Description de la compétence")?.toString(),
        })
        .then(() => getComp())
        .catch((error) => console.log(error));
  };

  const addSoftSkill = () => {
    SoftSkills?.length < 3 &&
      axios
        .post("http://localhost:3000/api/competences/soft", {
          name: prompt("Nom de la compétence")?.toString(),
          description: prompt("Description de la compétence")?.toString(),
        })
        .then(() => getComp())
        .catch((error) => console.log(error));
  };

  const putHardSkill = (e) => {
    axios
      .put(`http://localhost:3000/api/competences/hard/${e._id}`, {
        name: prompt("Nom de la compétence")?.toString() || e.name,
        description:
          prompt("Description de la compétence")?.toString() || e.description,
      })
      .then(() => getComp())
      .catch((error) => console.log(error));
  };

  const putSoftSkill = (e) => {
    axios
      .put(`http://localhost:3000/api/competences/soft/${e._id}`, {
        name: prompt("Nom de la compétence")?.toString() || e.name,
        description:
          prompt("Description de la compétence")?.toString() || e.description,
      })
      .then(() => getComp())
      .catch((error) => console.log(error));
  };

  const delHardSkill = (e) => {
    axios
      .delete(`http://localhost:3000/api/competences/hard/${e._id}`)
      .then(() => getComp())
      .catch((error) => console.log(error));
  };

  const delSoftSkill = (e) => {
    axios
      .delete(`http://localhost:3000/api/competences/soft/${e._id}`)
      .then(() => getComp())
      .catch((error) => console.log(error));
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
          <h4>
            Compétences techniques{"  "}
            {HardSkills?.length < 3 && (
              <FontAwesomeIcon
                onClick={() => addHardSkill()}
                icon={faPlus}
                className="addIcon"
                size="sm"
              />
            )}
          </h4>
          <ul>
            {HardSkills?.length > 0 ? (
              HardSkills?.map((comp) => (
                <div key={comp._id} className="row hard">
                  <div className="col-0 icons">
                    <FontAwesomeIcon
                      onClick={() => putHardSkill(comp)}
                      icon={faPencilAlt}
                      size="sm"
                    />
                    <FontAwesomeIcon
                      onClick={() => delHardSkill(comp)}
                      icon={faTrashAlt}
                      size="sm"
                    />
                  </div>
                  {"  "}
                  <li key={comp.id}>
                    <h5>{comp.name || "No data"}</h5>
                    <p>{comp.description || "No data"}</p>
                  </li>
                </div>
              ))
            ) : (
              <h1>No data</h1>
            )}
          </ul>
        </div>
        <div className=" col-6 text-left">
          <h4>
            Compétences générales{"  "}
            {SoftSkills?.length < 3 && (
              <FontAwesomeIcon
                onClick={() => addSoftSkill()}
                icon={faPlus}
                className="addIcon"
                size="sm"
              />
            )}
          </h4>
          <ul>
            {SoftSkills?.length > 0 ? (
              SoftSkills?.map((comp) => (
                <div key={comp._id} className="row soft">
                  <div className="col-0 icons">
                    <FontAwesomeIcon
                      onClick={() => putSoftSkill(comp)}
                      icon={faPencilAlt}
                      size="sm"
                    />
                    <FontAwesomeIcon
                      onClick={() => delSoftSkill(comp)}
                      icon={faTrashAlt}
                      size="sm"
                    />
                  </div>
                  {"  "}
                  <li key={comp.id}>
                    <h5>{comp.name || "No data"}</h5>
                    <p>{comp.description || "No data"}</p>
                  </li>
                </div>
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
