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
import Explorar from "./pages/Explorar";
import Doacao from "./pages/Doacao";
import VaquinhaList from "./pages/ListarVaquinhas/ListarVaquinha";
import Admin from "./pages/Admin";
import Usuarios from "./pages/Admin/Usuarios";
import Vaquinhas from "./pages/Admin/Vaquinhas";
import Contribuicoes from "./pages/Admin/Contribuicoes";
import Apoios from "./pages/Admin/Apoios";
import ControlePublicacoes from "./pages/Admin/ControlePublicacoes";
import Relatorios from "./pages/Admin/Relatorios";
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
        <Route path="/explorar" element={<Explorar/>}/>
        <Route path="/doar" element={<Doacao/>}/>
        <Route path="/listarVaquinha" element={<VaquinhaList/>}/>
        <Route path="/admin-panel" element={<Admin/>}/>
        <Route path="/admin-usuarios" element={<Usuarios/>}/>
        <Route path="/admin-vaquinhas" element={<Vaquinhas/>}/>
        <Route path="/admin-contribuicoes" element={<Contribuicoes/>}/>
        <Route path="/admin-apoios" element={<Apoios/>}/>
        <Route path="/admin-controle-publicacoes" element={<ControlePublicacoes/>}/>
        <Route path="/admin-relatorios" element={<Relatorios/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
