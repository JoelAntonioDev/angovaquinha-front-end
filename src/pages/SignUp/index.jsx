import React, { useState } from "react"
import styles from "./SignUp.module.css"
function SignUp(){

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha:"",
      });
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleCadastrarUsuarios = (e)=>{
        e.preventDefault();
        console.log(formData);
        if(formData.nome=="" && formData.email=="" && formData.senha=="")
        {
            alert("Nenhum campo foi preenchido!!!");
            return;
        }else if(formData.nome=="" || formData.email=="" || formData.senha=="")
        {
            alert("Todos os campos precisam ser preenchidos!!!");
            return;
        }
        fetch("/api/signUp",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body: JSON.stringify(
                formData
            )
        }).then((response)=>{
            response.json()
        }).then((data)=>{
            console.log(data);
        }).catch((error)=>{
            console.log("Erro:"+error);
        });
    }
    const handleEntrar = ()=>{
        window.location.href="/login";
    }
    return(
        <div className={styles.containerSignup}>
            <div className={styles.containerCentral}>
                <div className={styles.leftSide}>
                    <div className={styles.containerLeftSide}>
                        <span>AngoVaquinhas</span>
                        <div className={styles.containerLeftSideIn}>
                            <h4>Bem-vindo ao AngoVaquinhas</h4>
                            <p> Acesse à sua conta agora mesmo</p>
                            <button className={styles.botaoEntrar} onClick={handleEntrar}>ENTRAR</button>
                            <a href="#">Esqueci minha senha</a>
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>
                <div className={styles.containerRightSide}>
                        <h2>Crie sua conta</h2>
                        <p>Vamos juntos, sozinho é mais difícil❤️</p>
                        <div className={styles.containerRightSideIn}>
                            <form action="">
                                <input type="text" name="nome" id="nome"  value={formData.nome} onChange={handleInputChange}  required placeholder="Nome" />
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange}  required placeholder="Email"/>
                                <input type="password" name="senha" id="senha" value={formData.senha} onChange={handleInputChange}  required placeholder="Senha"/>
                                <div className={styles.botaoContainer}>
                                    <button id="" className={styles.botaoCadastrar} onClick={(e)=>{handleCadastrarUsuarios(e)}}>CADASTRAR</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp