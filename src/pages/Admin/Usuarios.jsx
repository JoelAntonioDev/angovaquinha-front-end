import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [infoContato, setInfoContato] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false); // Para controlar o modo de edição de contato
  const [editUserMode, setEditUserMode] = useState(false); // Para controlar o modo de edição de usuário
  const [userDetails, setUserDetails] = useState(null); // Para armazenar os detalhes do usuário a serem editados

  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios")
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setUserDetails(usuario); // Carrega os dados do usuário para edição
    setEditUserMode(true); // Ativa o modo de edição do usuário
  };

  const handleRemove = (usuario) => {
    fetch(`http://localhost:8080/api/deleteUser/${usuario.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Usuário removido com sucesso");
          setUsuarios((prevUsuarios) =>
            prevUsuarios.filter((u) => u.id !== usuario.id)
          );
        } else {
          console.error("Erro ao remover o usuário");
        }
      })
      .catch((error) => {
        console.error("Erro ao remover o usuário:", error);
      });
  };

  const handleViewContactInfo = (usuario) => {
    setSelectedUser(usuario);
    fetch("http://localhost:8080/api/info-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: usuario.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInfoContato(data.data);
        setEditMode(false); // Sai do modo de edição de contato quando visualiza
      })
      .catch((error) => {
        console.error("Erro ao buscar informações de contato:", error);
      });
  };

  const handleEditContactInfo = () => {
    if (infoContato) {
      console.log("Dados a serem enviados para edição:", infoContato);
      fetch(`http://localhost:8080/api/edit-contact-info/${infoContato.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoContato),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Resposta da atualização de contato:", data);
          setInfoContato(data.data);
          setEditMode(false);
          window.location.href = "/ListarUsuario"; // Ajuste para redirecionar
        })
        .catch((error) => {
          console.error("Erro ao atualizar as informações de contato:", error);
        });
    }
  };

  const handleRemoveContactInfo = () => {
    if (infoContato) {
      fetch(`http://localhost:8080/api/deleteInformacao/${infoContato.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Informações de contato removidas com sucesso");
            setInfoContato(null); // Limpa as informações de contato da interface
            setSelectedUser(null); // Limpa o usuário selecionado
          } else {
            console.error("Erro ao remover as informações de contato");
          }
        })
        .catch((error) => {
          console.error("Erro ao remover as informações de contato:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfoContato((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveUser = () => {
    if (userDetails) {
      console.log("Dados a serem enviados para edição:", userDetails);

      fetch(`http://localhost:8080/api/edit-user/${userDetails.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Resposta da atualização do usuário:", data);
          setUsuarios((prevUsuarios) =>
            prevUsuarios.map((u) => (u.id === data.data.id ? data.data : u))
          );
          setEditUserMode(false);
          window.location.href = "/admin-panel"; // Ajuste para redirecionar
        })
        .catch((error) => {
          console.error("Erro ao atualizar o usuário:", error);
        });
    }
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center">
      <div className="p-mt-4">
        <DataTable
          value={usuarios}
          paginator
          rows={10}
          className="p-datatable-customers"
        >
          <Column field="nome" header="Nome" sortable headerStyle={{backgroundColor:"var(--primary)"}} style={{textAlign:"center"}} align={"center"}></Column>
          <Column field="email" header="Email" sortable headerStyle={{backgroundColor:"var(--primary)"}} style={{textAlign:"center"}} align={"center"}></Column>
          <Column
          field="operacoes" header="Operações"
            body={(rowData) => (
              <div className="p-d-flex p-ai-center" style={{ display:"flex",gap:"10px", justifyContent:"center"}}>
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
                  label="Gerir Informações"
                  icon="pi pi-info-circle"
                  className="p-button-info"
                  onClick={() => handleViewContactInfo(rowData)}
                  style={{padding:"5px"}}
                />
              </div>
            )}
            headerStyle={{backgroundColor:"var(--primary)"}}
            align={"center"}
          />
        </DataTable>

        {editUserMode && userDetails && (
          <div className="p-mt-4">
            <h3>Editar Usuário {userDetails.nome}</h3>
            <div>
              <div className="p-field">
                <label htmlFor="nome">Nome</label>
                <InputText
                  id="nome"
                  name="nome"
                  value={userDetails.nome}
                  onChange={handleUserInputChange}
                />
              </div>
              <div className="p-field">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleUserInputChange}
                />
              </div>
              <div className="p-d-flex p-ai-center">
                <Button
                  label="Salvar"
                  icon="pi pi-check"
                  onClick={handleSaveUser}
                />
                <Button
                  label="Cancelar"
                  icon="pi pi-times"
                  className="p-button-secondary"
                  onClick={() => setEditUserMode(false)}
                />
              </div>
            </div>
          </div>
        )}

        {selectedUser && !editUserMode && (
          <div className="p-mt-4">
            <h3>Informações de Contato para {selectedUser.nome}</h3>
            {infoContato ? (
              editMode ? (
                <div>
                  <div className="p-field">
                    <label htmlFor="bilheteIdentidade">
                      Bilhete de Identidade
                    </label>
                    <InputText
                      id="bilheteIdentidade"
                      name="bilheteIdentidade"
                      value={infoContato.bilheteIdentidade}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="numeroTelefone">Número de Telefone</label>
                    <InputText
                      id="numeroTelefone"
                      name="numeroTelefone"
                      value={infoContato.numeroTelefone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="provincia">Província</label>
                    <InputText
                      id="provincia"
                      name="provincia"
                      value={infoContato.provincia}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="municipio">Município</label>
                    <InputText
                      id="municipio"
                      name="municipio"
                      value={infoContato.municipio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="p-d-flex p-ai-center">
                    <Button
                      label="Salvar"
                      icon="pi pi-check"
                      onClick={handleEditContactInfo}
                    />
                    <Button
                      label="Cancelar"
                      icon="pi pi-times"
                      className="p-button-secondary"
                      onClick={() => setEditMode(false)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Bilhete de Identidade:</strong>{" "}
                    {infoContato.bilheteIdentidade}
                  </p>
                  <p>
                    <strong>Número de Telefone:</strong>{" "}
                    {infoContato.numeroTelefone}
                  </p>
                  <p>
                    <strong>Província:</strong> {infoContato.provincia}
                  </p>
                  <p>
                    <strong>Município:</strong> {infoContato.municipio}
                  </p>
                  <div className="p-d-flex p-ai-center">
                    <Button
                      label="Editar"
                      icon="pi pi-pencil"
                      onClick={() => setEditMode(true)}
                    />
                    <Button
                      label="Remover"
                      icon="pi pi-trash"
                      className="p-button-danger"
                      onClick={handleRemoveContactInfo}
                    />
                  </div>
                </div>
              )
            ) : (
              <p>Sem informações de contato disponíveis.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
