import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import CardVaquinha from "../CardVaquinha";

function Container() {
  const [id, setId] = useState();
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [dataCriacao, setDataCriacao] = useState();
  const [caminhoImagem, setCaminhoImagem] = useState();
  const [objectivo, setObjectivo] = useState();
  useEffect(() => {
    fetch("/api/get-vaquinhas", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data !== "") {
          setId(data.data[0].id);
          setTitulo(data.data[0].titulo);
          setDescricao(data.data[0].descricao);
          setDataCriacao(data.data[0].dataCriacao);
          setCaminhoImagem(data.data[0].caminhoImagem);
          setObjectivo(data.data[0].quantia);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  useEffect(()=>{
    fetch("/api/get-vaquinha", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({titulo:"F"})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <div className={styles.container_container}>
      <div className={styles.secao_banner}>
        <img src="/src/images/banner1.png" alt="" />
      </div>
      <div className={styles.secao_1}>
        <CardVaquinha titulo={titulo} descricao={descricao} objectivo={objectivo} />
      </div>
      <div className={styles.secao_2}>
        <h1>SECÇÃO 2</h1>
      </div>
      <div className={styles.secao_3}>
        <h1>SECÇÃO 3</h1>
      </div>
    </div>
  );
}

export default Container;
