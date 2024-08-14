import {Route, Routes} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage/loginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MainPage from "./pages/MainPage/MainPage";
import Navigator from "./components/Navigator/Navigator";

function App() {
  return (
    <div>
      <Navigator />
      <Routes>
        <Route path="/home" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
