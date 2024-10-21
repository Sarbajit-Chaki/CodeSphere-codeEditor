import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import DashboardComponent from "./components/Dashboard/DashboardComponent";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-black overflow-x-hidden scroll-smooth">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route element={<Dashboard />}>
            <Route path="/dashboard" element={<DashboardComponent />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
