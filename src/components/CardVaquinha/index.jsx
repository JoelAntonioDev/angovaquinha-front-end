import React, { useEffect, useState, useRef } from "react";
import styles from "./CardVaquinha.module.css";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
function CardVaquinha({
  id,
  titulo,
  descricao,
  objectivo,
  dataCriacao,
  foto,
  contribuidores,
}) {
  const [dataFormatada, setDataFormatada] = useState("");
  const navigate = useNavigate();
  const toast = useRef();
  const show = ()=>{
    toast.current.show({
      severity:"info",
      summary:"Associar conta",
      detail:"Será redirecionado para a página para adicionar as suas informações da conta",
      life:4000
    })
  }
  const handleDoar = (id) => {
    const value = localStorage.getItem("user");
    const user = value ? JSON.parse(value) : null;
    console.log(user.conta!=null);
    console.log(id);
    if(user.conta!=null)
      navigate("/doar",{state:id});
    else{
      show();
      setTimeout(()=>{
        navigate("/userProfile");
      },4500);
    }
  };
  useEffect(() => {
    if (dataCriacao) {
      const data = new Date(dataCriacao);
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const dataLegivel = data.toLocaleDateString("pt-BR", options);
      setDataFormatada(dataLegivel);
    }
  }, [dataCriacao]);

  return (
    <div className={styles.container_card}>
      <Toast ref={toast}/>
      <div className={styles.leftSide}>
        <h1>{titulo || "Titulo"}</h1>
        <p>
          {descricao || "FAÇA UMA DOAÇÃO E AJUDE A COMPLETAR ESTA VAQUINHA"}
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <h3>Quantia pretendida</h3>
          <h3>{objectivo ? `${objectivo} KZ` : "0,00 KZ"}</h3>
        </div>
        <p>{dataFormatada || "SEM DATA"}</p>
        <div className={styles.status_bar}>
          <div className={styles.status_barLeft}></div>
          <div className={styles.status_barRight}></div>
          <div className={styles.porcentagem}>70%</div>
        </div>
        <div className={styles.container_botao}>
          <button
            className={styles.botao_verContribuidores}
            onClick={()=>{handleDoar(id)}}
          >
            Doar
          </button>
          <button className={styles.botao_verContribuidores}>
            Ver Contribuidores
          </button>
        </div>
      </div>

      <div className={styles.rightSide}>
        <img src={foto} alt={titulo} className={styles.cardImage} />
      </div>
    </div>
  );
}

export default CardVaquinha;
