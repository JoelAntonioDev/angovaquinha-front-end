import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
function Login() {
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
        console.log(formData);
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                senha: formData.senha
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Login success:", data);
            localStorage.setItem('user',JSON.stringify(data.data));
            navigate("/home",{state:{userData:data.data}});
        })
        .catch(error => {
            console.error("Erro:", error);
        });
    }
    

    const handleCriarConta = () => {
        window.location.href = "/signUp";
    };

    return (
        <div className={styles.containerSignup}>
            <div className={styles.containerCentral}>
                <div className={styles.leftSide}>
                    <div className={styles.containerLeftSide}>
                        <span>AngoVaquinhas</span>
                        <div className={styles.containerLeftSideIn}>
                            <h4>Bem-vindo ao AngoVaquinhas</h4>
                            <p>Crie a sua conta agora mesmo</p>
                            <button className={styles.botaoEntrar} onClick={handleCriarConta}>CRIAR CONTA</button>
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.containerRightSide}>
                        <h2>Entre na sua conta</h2>
                        <p>Vamos juntos, sozinho é mais difícil❤️</p>
                        <div className={styles.containerRightSideIn}>
                            <form>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required placeholder="Email"/>
                                <input type="password" name="senha" id="senha" value={formData.senha} onChange={handleInputChange} required placeholder="Senha"/>
                                <div className={styles.botaoContainer}>
                                    <button className={styles.botaoCadastrar} onClick={handleEntrar}>ENTRAR</button>
                                </div>
                                <a href="#">Esqueci minha senha</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
