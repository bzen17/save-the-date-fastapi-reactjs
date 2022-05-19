import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppWithRouterAccess from "./AppWithRouterAccess";
import Layout from "./components/LayoutWithoutNavbar";
import { AuthContextProvider } from "./redux/store/auth-context";
import { LoaderContextProvider } from "./redux/store/loader-context";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <LoaderContextProvider>
        <AppWithRouterAccess />
        </LoaderContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
