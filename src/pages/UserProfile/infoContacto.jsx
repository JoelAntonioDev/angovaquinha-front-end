import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
function InfoContacto() {
  const value = localStorage.getItem("user");
  const user = value ? JSON.parse(value) : null;
  const [informacaoContacto, setInformacaoContacto] = useState();
  useEffect(() => {
    if (user && user.id) {
      console.log(user.id);
      fetch("/api/info-contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setInformacaoContacto(data.data);
          console.log("chegou aqui");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div className={styles.container_contact}>
      <h1 style={{ textAlign: "center" }}>Informações de contacto</h1>
      {informacaoContacto ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label htmlFor="nome">Nome Completo</label>
          <input
            type="text"
            name="nome"
            id="nome"
            readOnly
            value={informacaoContacto.usuario.nome}
          />
          <label htmlFor="telefone">Número de Telefone</label>
          <input
            type="text"
            name="telefone"
            id="telefone"
            readOnly
            value={informacaoContacto.numeroTelefone}
          />
          <label htmlFor="provincia">Província</label>
          <input
            type="text"
            name="provincia"
            id="provincia"
            readOnly
            value={informacaoContacto.provincia}
          />
          <label htmlFor="municipio">Município</label>
          <input
            type="text"
            name="municipio"
            id="municipio"
            readOnly
            value={informacaoContacto.municipio}
          />
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            name="bairro"
            id="bairro"
            readOnly
            value={informacaoContacto.bairro}
          />
          <label htmlFor="bi">Bilhete de Identidade</label>
          <input
            type="text"
            name="bi"
            id="bi"
            readOnly
            value={informacaoContacto.bilheteIdentidade}
          />
        </div>
      ) : (
        <p>Carregando informações de contato...</p>
      )}
    </div>
  );
}

export default InfoContacto;
