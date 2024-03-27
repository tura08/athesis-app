import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//styles
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Shipments from "./pages/shipments/Shipments";
import Shipment from "./pages/shipment/Shipment";
import ToDo from "./pages/todo/ToDo";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Dashboard /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/shipments"
                element={
                  user ? <Shipments /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/shipments/:id"
                element={user ? <Shipment /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/todo"
                element={user ? <ToDo /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/login"
                element={
                  !user ? <Login /> : <Navigate to="/shipments" replace />
                }
              />
              {/* <Route
                path="/signup"
                element={
                  user ? <Signup /> : <Navigate to="/login" replace />
                }
              /> */}
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
