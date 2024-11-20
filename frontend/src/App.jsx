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
import { useEffect, useState } from "react";
import { getUser } from "./api/user";
import Cookies from "js-cookie";
import NotFoundPage from "./pages/NotFoundPage";
import { useDispatch } from "react-redux";
import { setUserObj } from "./features/Profile/profileSlice";
import CodeEditor from "./pages/CodeEditor";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

      let data = {
        _id: res?.user?._id ?? "",
        firstName: res?.user?.firstName ?? "",
        lastName: res?.user?.lastName ?? "",
        email: res?.user?.email ?? "",
        about: res?.user?.about ?? "",
        imageUrl: res?.user?.imageUrl ?? "",
        googleId: res?.user?.googleId ?? "",
        createdAt: res?.user?.createdAt ?? "",
        rooms: res?.user?.rooms ?? []
      }
      
      dispatch(setUserObj(data));
      setIsAuthenticated(true);
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
          {
            isAuthenticated ? (
              <Route path="/" element={<Dashboard />}>
                <Route path="/" element={<DashboardComponent />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<MyProfile />} />
              </Route>
            ) : (
              <Route path="/" element={<Home />} />
            )
          }
          {!isAuthenticated && <Route path="/auth" element={<Auth />} />}
          <Route path="/room" element={<CodeEditor />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
