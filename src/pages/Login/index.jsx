import React, { useState, useRef } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

function Login() {
  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: "error",
      summary: "Erro",
      detail: "Impossível fazer login!",
      life: 3000
    });
  };

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEntrar = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        senha: formData.senha,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login success:", data);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/home", { state: { userData: data.data } });
      })
      .catch((error) => {
        console.error("Erro:", error);
        show();
      });
  };

  const handleCriarConta = () => {
    window.location.href = "/signUp";
  };

  return (
    <div className={styles.containerSignup}>
      <Toast ref={toast} style={{ padding: "10px" }} />
      <div className={styles.containerCentral}>
        <div className={styles.leftSide}>
          <div className={styles.containerLeftSide}>
            <span>AngoVaquinhas</span>
            <div className={styles.containerLeftSideIn}>
              <h4>Bem-vindo ao AngoVaquinhas</h4>
              <p>Crie a sua conta agora mesmo</p>
              <button className={styles.botaoEntrar} onClick={handleCriarConta}>
                CRIAR CONTA
              </button>
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.containerRightSide}>
            <h2>Entre na sua conta</h2>
            <p>Vamos juntos, sozinho é mais difícil❤️</p>
            <div className={styles.containerRightSideIn}>
              <form>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required
                  placeholder="Senha"
                />
                <div className={styles.botaoContainer}>
                  <button
                    className={styles.botaoCadastrar}
                    onClick={handleEntrar}
                  >
                    ENTRAR
                  </button>
                </div>
                <a href="#">Esqueci minha senha</a>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Estilos para o Toast */}
      <style jsx>{`
        .p-toast {
          background-color: #333; /* Cor de fundo do toast */
          border-radius: 8px; /* Bordas arredondadas */
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Sombra */
          color: white; /* Cor do texto */
        }

        .p-toast-container {
          margin-bottom: 10px; /* Espaçamento entre as mensagens */
          
        }

        .p-toast-item {
          background-color: #444; /* Cor de fundo da mensagem */
          padding: 45px; /* Espaçamento interno */
          border-radius: 8px; /* Bordas arredondadas */
          display: flex;
          align-items: center;
        }

        .p-toast-icon-close {
          color: #fff; /* Cor do ícone de fechar */
          font-size: 1.2em; /* Tamanho do ícone */
          margin-left: 10px; /* Espaçamento à esquerda */
          cursor: pointer; /* Cursor do mouse */
        }

        .p-toast-image {
          margin-right: 10px; /* Espaçamento à direita */
          font-size: 1.5em; /* Tamanho do ícone */
        }

        .p-toast-message {
          display: flex;
          flex-direction: column;
        }

        .p-toast-title {
          font-weight: bold; /* Texto em negrito */
          margin-bottom: 5px; /* Espaçamento abaixo do título */
          color: #ff6b6b; /* Cor específica para o título */
        }
      `}</style>
    </div>
  );
}

export default Login;
