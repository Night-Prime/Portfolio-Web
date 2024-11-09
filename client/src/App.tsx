import routes from "./routes";
import { useRoutes } from "react-router";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const content = useRoutes(routes);
  return content;
}

export default App;
