import React, { useState } from "react";
import HeaderIn from "../../components/HeaderIn";
import Footer from "../../components/Footer";
import Conta from "./conta";
import InfoContacto from "./infoContacto";
import styles from "./UserProfile.module.css";
function UserProfile() {
  const [selectedContent, setSelectedContent] = useState(
    "INFORMAÇÕES DE CONTACTO"
  );
  const handleContentChange = (content) => {
    setSelectedContent(content);
  };
  const renderContent = () => {
    switch (selectedContent) {
      case "CONTA":
        return <Conta />;
      case "INFORMAÇÕES DE CONTACTO":
        return <InfoContacto />;
      default:
        return <h1>INFORMAÇÕES DA CONTA</h1>;
    }
  };
  return (
    <>
      <HeaderIn />
      <div className={styles.container_user_profile}>
        <div className={styles.left_side_up}>
          <div className={styles.left_buttoms}>
            <button onClick={() => handleContentChange("CONTA")}>CONTA</button>
            <button
              onClick={() => handleContentChange("INFORMAÇÕES DE CONTACTO")}
            >
              INFORMAÇÕES DE CONTACTO
            </button>
          </div>
        </div>
        <div className={styles.right_side_up}>{renderContent()}</div>
      </div>

      <Footer />
    </>
  );
}

export default UserProfile;
