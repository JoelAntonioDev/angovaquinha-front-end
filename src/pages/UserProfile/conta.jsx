import React, {useEffect, useState} from "react";

function Conta(){
    const [dadosConta, setDadosConta] = useState("");
    const value = localStorage.getItem("user");
    const user = value ? JSON.parse(value):null;
    useEffect(()=>{
        console.log(user.conta);
        setDadosConta(user.conta);
    },[]);
    return(
        <div >
            <h1 style={{textAlign:"center"}}>Informações da Conta</h1>
            <form action="" method="post" style={{display:"flex",flexDirection:"column", alignItems:"center", padding:"20px"}}>
                <label htmlFor="iban">IBAN</label>
                <input type="text" name="iban" id="iban" value={user.conta.iban} readOnly/>
                <label htmlFor="nomeBanco">Banco</label>
                <input type="text" name="nomeBanco" id="nomeBanco" value={user.conta.nomeBanco} readOnly/>
                <label htmlFor="numeroConta">Número da Conta</label>
                <input type="text" name="numeroConta" id="numeroConta" value={user.conta.numeroConta} readOnly/>
            </form>
        </div>
        
    )
}

export default Conta;