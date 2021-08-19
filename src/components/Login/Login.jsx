import axios from "axios";
import React, { useState } from "react";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [userInfo, setUserInfo] = useState({
  //      mail: "",
  //      password:""
  //   })

  const login = () => {
    axios
      .post("http://localhost:3000/api/users/login", {
        mail: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("currentToken", JSON.stringify(response.data));
        window.location.reload(false);
      });
  };

  const signup = () => {
    axios
      .post("http://localhost:3000/api/users/signup", {
        mail: email,
        password: password,
      })
      .then(() => {
        alert("votre compte a été crée!");
      });
  };

  return (
    <div id="login">
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // setUserInfo({...userInfo, mail: e.target})
      />
      <input
        type="password"
        placeholder="mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Connexion</button>
      <button onClick={signup}>Inscription</button>
    </div>
  );
}

export default Login;
