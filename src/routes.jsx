import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CardVaquinha from "./components/CardVaquinha";
import HomeIn from "./pages/HomeIn";
import CadastrarVaquinha from "./pages/CadastrarVaquinha/CadastrarVaquinha"
import InfoContacto from "./pages/UserProfile/infoContacto";
import Conta from "./pages/UserProfile/conta";
import UserProfile from "./pages/UserProfile/index";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/cardVaquinha" element={<CardVaquinha/>} />
        <Route path="/cadastroVaquinha" element={<CadastrarVaquinha/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/conta" element={<Conta/>}/>
        <Route path="/infoContacto" element={<InfoContacto/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
