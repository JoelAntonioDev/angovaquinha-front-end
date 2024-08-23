import React, { useState, useRef, useEffect } from "react";
import HeaderIn from "../../components/HeaderIn";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import styles from "./Doacao.module.css";
import { Toast } from "primereact/toast";

function Doacao() {
  const toast = useRef();

  const location = useLocation();
  const id = location.state || {};
  const value = localStorage.getItem("user");
  const userEmail = value ? JSON.parse(value).email : null;
  const [contribuintes, setContribuintes] = useState([]);
  const [valorMonetario, setValorMonetario] = useState(0);
  const [moeda, setMoeda] = useState("KZ");

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Contribuição feita com sucesso",
      detail: "Você contribuiu nesta vaquinha, muito obrigado por contribuir",
      life: 4000,
    });
  };

  const handleSelected = (e) => {
    setMoeda(e.target.value || "KZ");
  };

  const handleValorMonetario = (e) => {
    setValorMonetario(e.target.value);
  };

  const handleSubmit = () => {
    fetch("/api/add-contribuicao", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        valorMonetario: valorMonetario,
        moeda: moeda,
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        show();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("/api/get-contribuintes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setContribuintes(data.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleConverterData = (data) => {
    const dataIn = new Date(data);
    return dataIn.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <HeaderIn />
      <div className={styles.container_doacao}>
        <Toast ref={toast} />
        <h1>DOAÇÃO da vaquinha com o ID: {id}</h1>
        <input
          type="email"
          name="email"
          id="email"
          className={styles.form_style}
          value={userEmail || "Erro: Não há email"}
          readOnly
          style={{ backgroundColor: "#ccc" }}
        />
        <input
          type="number"
          name="valorMonetario"
          id="valorMonetario"
          placeholder="0,00KZ"
          className={styles.form_style}
          onChange={handleValorMonetario}
        />
        <select
          name="moeda"
          id="moeda"
          className={styles.form_style}
          onChange={handleSelected}
        >
          <option value="KZ">KZ</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button
          className={styles.botao_doacao}
          onClick={handleSubmit}
        >
          DOAR
        </button>
      </div>
      <div className={styles.contribuintes}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor Monetário</th>
              <th>Moeda</th>
              <th>Data de Criação</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {contribuintes.length > 0 ? (
              contribuintes.map((c, index) => (
                <tr key={index}>
                  <td>{c.usuario.nome}</td>
                  <td>{c.valorMonetario}</td>
                  <td>{c.moeda}</td>
                  <td>{handleConverterData(c.dataCriacao)}</td>
                  <td>{c.usuario.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum contribuinte encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Doacao;
