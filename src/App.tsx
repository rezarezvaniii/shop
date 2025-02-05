import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Util as REPO_BASE_Util } from "./services/Repository/BASE/Util";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/products" element={<ProductList />} />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </Router>
    </>
  );
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!REPO_BASE_Util.getCookie("refreshToken");
  return isAuthenticated ? <>{children}</> : <Navigate to="/pruducts" />;
};
export default App;
