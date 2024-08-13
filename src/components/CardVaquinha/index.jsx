import React from "react";
import styles from "./CardVaquinha.module.css";
function CardVaquinha({ titulo, descricao, objectivo, foto, contribuidores }) {
  return (
    <div className={styles.container_card}>
      <div className={styles.leftSide}>
        <h1>{titulo ? titulo : "Titulo"}</h1>
        <p>
          {descricao
            ? descricao
            : "FAÇA UMA DOAÇÃO E AJUDE A COMPLETAR ESTA VAQUINHA"}
        </p>
        <div style={{display:"flex", gap:"10px"}}>
          <h3>Quantia pretendida</h3> 
          <h3>{objectivo?objectivo+"KZ":"0,00KZ"}</h3>
        </div>

        <div className={styles.status_bar}>
          <div className={styles.status_barLeft}></div>
          <div className={styles.status_barRight}></div>
          <div className={styles.porcentagem}>70%</div>
        </div>
        <div className={styles.container_botao}>
          <button className={styles.botao_verContribuidores}>
            Ver Contribuidores
          </button>
        </div>
      </div>

      <div className={styles.rightSide}></div>
    </div>
  );
}

export default CardVaquinha;
