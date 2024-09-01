import React, {useEffect, useState} from "react";
import styles from "./Admin.module.css";
import HeaderIn from "../../components/HeaderIn";
import Footer from "../../components/Footer";
import Usuarios from "./Usuarios";
import Vaquinhas from "./Vaquinhas";
import Contribuicoes from "./Contribuicoes";
import Apoios from "./Apoios";
import ControlePublicacoes from "./ControlePublicacoes";
import Relatorios from "./Relatorios";
import Default from "./Default";
function Admin() {
    const [selectedContent, setSelectedContent] = useState("default");


    const handleContentChange = (content)=>{
        setSelectedContent(content);
    }
    const renderContent = ()=>{
        switch(selectedContent){
            case "dashboard":
              return <Default />;
            case "usuarios":
                return <Usuarios/>;
            case "vaquinhas":
                return <Vaquinhas/>;
            case "contribuicoes":
                return <Contribuicoes/>;
            case "relatorios":
                return <Relatorios/>;
            case "apoios":
                return <Apoios/>;
            case "controle de publicacoes":
                return <ControlePublicacoes/>;
            default:
                return <Default/>;
        }
    }
  return (
    <div className={styles.admin_container}>
      <HeaderIn />
      <div className={styles.admin_content}>
        <div className={styles.admin_left}>
          <div >INFORMAÇÕES DO ADMIN</div>
          <div className={styles.admin_left_element}>
            <a href="#" onClick={()=>handleContentChange("dashboard")}>Dashboard</a>
          </div>
          <div className={styles.admin_left_element}>
            <a href="#" onClick={()=>handleContentChange("usuarios")}>Usuários</a>
          </div>
          <div className={styles.admin_left_element}>
            <a href="#" onClick={()=>handleContentChange("vaquinhas")}>Vaquinhas</a>
          </div>
          <div className={styles.admin_left_element}>
            <a href="#" onClick={()=>handleContentChange("contribuicoes")}>Contribuições</a>
          </div>
          <div className={styles.admin_left_element}>
            <a href="#" onClick={()=>handleContentChange("relatorios")}>Relatórios</a>
          </div>
          <div className={styles.admin_left_element}>
            <a href="#" onClick={()=>handleContentChange("apoios")}>Apoios</a>
          </div>
          <div className={styles.admin_left_element}>
            <a href="#" onClick={()=>handleContentChange("controle de publicacoes")}>Controle de publicações</a>
          </div>
          <div className={styles.admin_left_element}>
            <a href="#" onClick={()=>handleContentChange("controle de publicacoes")}>Controle de publicações</a>
          </div>
        </div>
        <div className={styles.admin_right}>
            <div>
               {renderContent()}
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
