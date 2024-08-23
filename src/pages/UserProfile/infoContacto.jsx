import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";

function InfoContacto() {
  const value = localStorage.getItem("user");
  const user = value ? JSON.parse(value) : null;
  const [informacaoContacto, setInformacaoContacto] = useState();
  
  useEffect(() => {
    if (user && user.id) {
      fetch("/api/info-contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setInformacaoContacto(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  
  const handleChangeGenerico = (e) => {
    const { name, value } = e.target;

    setInformacaoContacto((prevState) => {
      // Se o campo for 'nome', ele está dentro do objeto 'usuario'
      if (name === "nome") {
        return {
          ...prevState,
          usuario: {
            ...prevState.usuario,
            nome: value,
          },
        };
      }
      
      // Para outros campos que estão no nível superior, atualize diretamente
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  
  return (
    <div className={styles.container_contact}>
      <h1 style={{ textAlign: "center" }}>Informações de contacto</h1>
      {informacaoContacto ? (
        <form className={styles.formulario_info_contacto}>
          <div className={styles.element}>
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              name="nome"
              id="nome"
              onChange={handleChangeGenerico}
              className={styles.form_style}
              value={informacaoContacto.usuario.nome}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="telefone">Número de Telefone</label>
            <input
             type="number"
              name="numeroTelefone"
              id="numeroTelefone"
              onChange={handleChangeGenerico}
              className={styles.form_style}
              value={informacaoContacto.numeroTelefone}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="provincia">Província</label>
            <input
              type="text"
              name="provincia"
              id="provincia"
              onChange={handleChangeGenerico}
              className={styles.form_style}
              value={informacaoContacto.provincia}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="municipio">Município</label>
            <input
              type="text"
              name="municipio"
              id="municipio"
              onChange={handleChangeGenerico}
              className={styles.form_style}
              value={informacaoContacto.municipio}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              name="bairro"
              id="bairro"
              onChange={handleChangeGenerico}
              className={styles.form_style}
              value={informacaoContacto.bairro}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="bi">Bilhete de Identidade</label>
            <input
              type="text"
              name="bi"
              id="bi"
              onChange={handleChangeGenerico}
              className={styles.form_style}
              value={informacaoContacto.bilheteIdentidade}
            />
          </div>
          <div>
            <button className={styles.botao_associar}>Editar</button>
          </div>
        </form>
      ) : (
        <form className={styles.formulario_info_contacto}>
          <div className={styles.element}>
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              name="nome"
              id="nome"
              onChange={handleChangeGenerico}
              className={styles.form_style}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="telefone">Número de Telefone</label>
            <input
              type="text"
              name="telefone"
              id="telefone"
              onChange={handleChangeGenerico}
              className={styles.form_style}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="provincia">Província</label>
            <input
              type="text"
              name="provincia"
              id="provincia"
              onChange={handleChangeGenerico}
              className={styles.form_style}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="municipio">Município</label>
            <input
              type="text"
              name="municipio"
              id="municipio"
              onChange={handleChangeGenerico}
              className={styles.form_style}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              name="bairro"
              id="bairro"
              onChange={handleChangeGenerico}
              className={styles.form_style}
            />
          </div>

          <div className={styles.element}>
            <label htmlFor="bi">Bilhete de Identidade</label>
            <input
              type="text"
              name="bi"
              id="bi"
              onChange={handleChangeGenerico}
              className={styles.form_style}
            />
          </div>
          <div>
            <button className={styles.botao_associar}>Editar</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default InfoContacto;
