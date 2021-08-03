import "./App.css";
import Comp from "./components/Comp/Comp";
import Exp from "./components/Exp/Exp";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Exp />
      <Comp />
      <Form />
      <p className="footer">CV entièrement codé en HTML/CSS/JSX(React)</p>
    </div>
  );
}

export default App;
