import "./App.css";
import CreateQuote from "./components/CreateQuote";
import NavBar from "./components/NavBar";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes.js";
function App() {
  const element = useRoutes(routes);
  return (
    <div className="App">
      <NavBar />
      {element}
    </div>
  );
}

export default App;
