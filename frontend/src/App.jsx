import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import DashboardComponent from "./components/Dashboard/DashboardComponent";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { getUser } from "./api/user";
import Cookies from "js-cookie";

function App() {
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.log("No token found.");
        return; 
      }

      const res = await getUser();
      if (!res) {
        return;
      }
      console.log("useEffect response:", res);
    };

    fetchUser();
  }, [location]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <div className="bg-black overflow-x-hidden scroll-smooth">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<Dashboard />}>
            <Route path="/dashboard" element={<DashboardComponent />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<MyProfile />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
