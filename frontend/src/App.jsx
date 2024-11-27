import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import DashboardComponent from "./components/Dashboard/DashboardComponent";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { getUser } from "./api/user";
import Cookies from "js-cookie";
import NotFoundPage from "./pages/NotFoundPage";
import { useDispatch } from "react-redux";
import { setUserObj } from "./features/Profile/profileSlice";
import CodeEditor from "./pages/CodeEditor";
import ErrorPage from "./pages/ErrorPage";
import SkeletonComponent from "./components/Skeleton/Skeleton";
import ResetPassword from "./components/ForgotPassword/ResetPassword";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        console.log("No token found.");
        setIsLoading(false);
        return;
      }

      
      const res = await getUser();
      if (!res) {
        setIsLoading(false);
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
      setIsLoading(false);
    };

    fetchUser();
  }, [location]);

  if(isLoading) {
    return <SkeletonComponent />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-black overflow-x-hidden scroll-smooth relative">
        
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
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/room" element={<CodeEditor />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
