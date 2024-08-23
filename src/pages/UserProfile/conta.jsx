import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
function Conta() {
  const [dadosConta, setDadosConta] = useState("");
  const value = localStorage.getItem("user");
  const user = value ? JSON.parse(value) : null;
  useEffect(() => {
    console.log(user.conta);
    setDadosConta(user.conta);
  }, []);
  return (
    <div className={styles.conta_container}>
      {dadosConta ? (
        <>
          <h1 style={{ textAlign: "center" }}>Informações da Conta</h1>
          <form
            action=""
            method="post"
            className={styles.formulario_conta}
          >
            <div className={styles.element}>
              <label htmlFor="iban">IBAN</label>
              <input
                type="text"
                name="iban"
                id="iban"
                value={user.conta.iban}
                readOnly
                className={styles.form_style}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="nomeBanco">Banco</label>
              <input
                type="text"
                name="nomeBanco"
                id="nomeBanco"
                value={user.conta.nomeBanco}
                readOnly
                className={styles.form_style}
              />
            </div>

            <div className={styles.element}>
              <label htmlFor="numeroConta">Número da Conta</label>
              <input
                type="text"
                name="numeroConta"
                id="numeroConta"
                value={user.conta.numeroConta}
                readOnly
                className={styles.form_style}
              />
            </div>
            <div>
              <button className={styles.botao_associar}>Editar</button>
            </div>
          </form>
        </>
      ) : (
        <div className={styles.conta_container_in}>
          <h1 style={{ textAlign: "center" }}>Informações da Conta</h1>
          <p>
            Insira as suas informações de conta para poder associar à sua conta
          </p>
          <form
            action=""
            method="post"
            className={styles.formulario_conta}
          >
            <div className={styles.element}>
              <label htmlFor="iban">IBAN</label>
              <input
                type="text"
                name="iban"
                id="iban"
                placeholder="Insira o seu IBAN"
                className={styles.form_style}
              />
            </div>
            <div className={styles.element}>
              <label htmlFor="nomeBanco">Banco</label>
              <input
                type="text"
                name="nomeBanco"
                id="nomeBanco"
                placeholder="Insira o nome do banco"
                className={styles.form_style}
              />
            </div>

            <div className={styles.element}>
              <label htmlFor="numeroConta">Número da Conta</label>
              <input
                type="text"
                name="numeroConta"
                id="numeroConta"
                placeholder="Insira o número da conta"
                className={styles.form_style}
              />
            </div>
            <div>
              <button className={styles.botao_associar}>Associar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Conta;
