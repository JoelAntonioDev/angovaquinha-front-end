import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Vaquinhas = () => {
  const [vaquinhas, setVaquinhas] = useState([]);
  const [vaquinhaDetails, setVaquinhaDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [contribuicoes, setContribuicoes] = useState([]);
  const [showContribuicoes, setShowContribuicoes] = useState(false);
  const [selectedContribuicao, setSelectedContribuicao] = useState(null);
  const [contribuicaoEditMode, setContribuicaoEditMode] = useState(false);
  const toast = useRef(null);

  const show = (mensagem, estado) => {
    toast.current.show({ severity: estado, detail: mensagem });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/vaquinhas")
      .then((response) => response.json())
      .then((data) => {
        setVaquinhas(data.data);
      })
      .catch((error) => {
        show("Erro ao buscar campanhas:", "error");
      });
  }, []);

  const handleEdit = (vaquinha) => {
    setVaquinhaDetails(vaquinha);
    setEditMode(true);
  };

  const handleRemove = (vaquinha) => {
    fetch(`http://localhost:8080/api/deleteVaquinha/${vaquinha.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          show("Vaquinha removida com sucesso", "success");
          setVaquinhas((prevVaquinhas) =>
            prevVaquinhas.filter((v) => v.id !== vaquinha.id)
          );
          setTimeout(() => {
            window.location.href = "/listarVaquinha";
          }, 3000);
        } else {
          show("Erro ao remover a Vaquinha", "error");
        }
      })
      .catch((error) => {
        show("Erro ao remover a campanha:", "error");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVaquinhaDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveVaquinha = () => {
    if (vaquinhaDetails) {
      fetch(`http://localhost:8080/api/editVaquinha/${vaquinhaDetails.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vaquinhaDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          show("Vaquinha atualizada com sucesso", "success");
          setVaquinhas((prevVaquinhas) =>
            prevVaquinhas.map((v) => (v.id === data.id ? data : v))
          );
          setEditMode(false);
          setTimeout(() => {
            window.location.href = "/admin-panel#";
          }, 3000);
        })
        .catch((error) => {
          show("Erro ao atualizar a campanha:", "error");
        });
    }
  };

  const handleToggleStatus = (vaquinhaId) => {
    fetch(`http://localhost:8080/api/toggleVaquinhaStatus/${vaquinhaId}`, {
      method: "PATCH",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao alterar o status da vaquinha");
        }
        return response.json();
      })
      .then((data) => {
        show("Estado da Vaquinha alterado com sucesso", "success");
        setVaquinhas(null);
        setTimeout(() => {
          window.location.href = "/listarVaquinha";
        }, 3000);
      })
      .catch((error) => {
        show("Erro ao alterar o status da vaquinha:", "error");
      });
  };

  const handleGerirContribuicoes = (vaquinha) => {
    fetch(`http://localhost:8080/api/get-contribuintes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: vaquinha.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos:", data); // Verifique a estrutura dos dados
        setContribuicoes(data.data || []); // Ajustado para lidar com a lista direta
        console.log("Estrutura completa dos dados:", contribuicoes);
        setShowContribuicoes(true);
      })
      .catch((error) => {
        console.error("Erro ao buscar contribuições:", error);
        show("Erro ao buscar contribuições:", "error");
      });
  };

  const handleEditContribuicao = (contribuicao) => {
    setSelectedContribuicao(contribuicao);
    setContribuicaoEditMode(true);
  };
  const handleSaveContribuicao = () => {
    if (selectedContribuicao) {
      fetch(
        `http://localhost:8080/contribuicao/edit/${selectedContribuicao.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedContribuicao),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          show("Contribuição atualizada com sucesso", "success");
          setContribuicoes((prevContribuicoes) =>
            prevContribuicoes.map((c) => (c.id === data.id ? data : c))
          );
          setContribuicaoEditMode(false);
          setSelectedContribuicao(null);
        })
        .catch((error) => {
          show("Erro ao atualizar a contribuição:", "error");
        });
    }
  };

  const handleRemoveContribuicao = (contribuicaoId) => {
    fetch(`http://localhost:8080/contribuicao/remove/${contribuicaoId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          show("Contribuição removida com sucesso", "success");
          setContribuicoes((prevContribuicoes) =>
            prevContribuicoes.filter((c) => c.id !== contribuicaoId)
          );
        } else {
          show("Erro ao remover a contribuição", "error");
        }
      })
      .catch((error) => {
        show("Erro ao remover a contribuição:", "error");
      });
  };

  const hideContribuicoesDialog = () => {
    setShowContribuicoes(false);
    setContribuicoes([]); // Limpar contribuições ao fechar o diálogo
    setContribuicaoEditMode(false); // Resetar o modo de edição
    setSelectedContribuicao(null);
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <Toast ref={toast} style={{ padding: "20px" }} />

      <div className="p-mt-4">
        <DataTable
          value={vaquinhas}
          paginator
          rows={10}
          className="p-datatable-customers"
        >
          <Column
            field="titulo"
            header="Título"
            sortable
            headerStyle={{ backgroundColor: "var(--primary)" }}
            style={{ textAlign: "center" }}
            align={"center"}
          ></Column>
          <Column
            field="descricao"
            header="Descrição"
            sortable
            headerStyle={{ backgroundColor: "var(--primary)" }}
            style={{ textAlign: "center" }}
            align={"center"}
          ></Column>
          <Column
            field="quantia"
            header="Quantia"
            sortable
            headerStyle={{ backgroundColor: "var(--primary)" }}
            style={{ textAlign: "center" }}
            align={"center"}
          ></Column>
          <Column
            field="subcategoria.nome"
            header="Subcategoria"
            sortable
            headerStyle={{ backgroundColor: "var(--primary)" }}
            style={{ textAlign: "center" }}
            align={"center"}
          ></Column>
          <Column
            field="estado.estado"
            header="Estado"
            sortable
            headerStyle={{ backgroundColor: "var(--primary)" }}
            style={{ textAlign: "center" }}
            align={"center"}
          ></Column>
          <Column
            body={(rowData) => (
              <div
                className="p-d-flex p-ai-center"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Button
                  label="Editar"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit(rowData)}
                  style={{padding:"5px"}}
                />
                <Button
                  label="Remover"
                  icon="pi pi-trash"
                  className="p-button-danger p-mr-2"
                  onClick={() => handleRemove(rowData)}
                  style={{padding:"5px"}}
                />
                <Button
                  label={
                    rowData.estado.estado === "ACTIVADO"
                      ? "Desativar"
                      : "Ativar"
                  }
                  icon={
                    rowData.estado.estado === "ACTIVADO"
                      ? "pi pi-times"
                      : "pi pi-check"
                  }
                  className={`p-button-${
                    rowData.estado.estado === "ACTIVADO" ? "danger" : "success"
                  } p-mr-2`}
                  onClick={() => handleToggleStatus(rowData.id)}
                  style={{padding:"5px"}}
                />
                <Button
                  label="Gerir Contribuições"
                  icon="pi pi-wallet"
                  className="p-button-info p-mr-2"
                  onClick={() => handleGerirContribuicoes(rowData)}
                  style={{padding:"5px"}}
                />
              </div>
            )}
            headerStyle={{ backgroundColor: "var(--primary)" }}
            style={{ textAlign: "center" }}
            align={"center"}
          />
        </DataTable>

        {editMode && vaquinhaDetails && (
          <div className="p-mt-4">
            <h3>Editar Campanha {vaquinhaDetails.titulo}</h3>
            <div className="p-grid p-fluid">
              <div className="p-col-12 p-md-6">
                <label htmlFor="titulo">Título</label>
                <InputText
                  id="titulo"
                  name="titulo"
                  value={vaquinhaDetails.titulo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label htmlFor="descricao">Descrição</label>
                <InputTextarea
                  id="descricao"
                  name="descricao"
                  value={vaquinhaDetails.descricao}
                  onChange={handleInputChange}
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label htmlFor="quantia">Quantia</label>
                <InputText
                  id="quantia"
                  name="quantia"
                  value={vaquinhaDetails.quantia}
                  onChange={handleInputChange}
                />
              </div>
              <div className="p-col-12 p-md-6">
                <label htmlFor="subcategoria">Subcategoria</label>
                <InputText
                  id="subcategoria"
                  name="subcategoria"
                  value={vaquinhaDetails.subcategoria}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                label="Salvar"
                icon="pi pi-check"
                className="p-mt-2"
                onClick={handleSaveVaquinha}
              />
              <Button
                label="Cancelar"
                icon="pi pi-times"
                className="p-mt-2 p-button-secondary"
                onClick={() => setEditMode(false)}
              />
            </div>
          </div>
        )}
      </div>

      <Dialog
        header="Contribuições"
        visible={showContribuicoes}
        onHide={hideContribuicoesDialog}
        style={{ width: "70vw" }}
      >
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"30px"}}>
          <table>
            <thead style={{backgroundColor:"var(--primary)", color:"white"}}>
              <tr>
                <th>Nome</th>
                <th>Valor Monetário</th>
                <th>Moeda</th>
                <th>Data de Criação</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {contribuicoes.length > 0 ? (
                contribuicoes.map((c, index) => (
                  <tr key={index}>
                    <td>{c.usuario.nome}</td>
                    <td>{c.valorMonetario}</td>
                    <td>{c.moeda}</td>
                    <td>{c.dataCriacao}</td>
                    {/*<td>{handleConverterData(c.dataCriacao)}</td>*/}
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
      </Dialog>
    </div>
  );
};

export default Vaquinhas;
