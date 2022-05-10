import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppWithRouterAccess from "./AppWithRouterAccess";
import Layout from "./components/LayoutWithoutNavbar";
import { AuthContextProvider } from "./redux/store/auth-context";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Layout>
          <AppWithRouterAccess />
        </Layout>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
