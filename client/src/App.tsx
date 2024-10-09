import routes from "./routes";
import { useRoutes } from "react-router";
import "./App.css";

function App() {
  const content = useRoutes(routes);
  return content;
}

export default App;
