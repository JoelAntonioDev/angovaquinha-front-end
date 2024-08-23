import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import HeaderIn from "../../components/HeaderIn";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const VaquinhaList = () => {
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
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/vaquinhas')
            .then(response => response.json())
            .then(data => {
                setVaquinhas(data.data);
            })
            .catch(error => {
                show("Erro ao buscar campanhas:", "error");
            });
    }, []);

    const handleEdit = (vaquinha) => {
        setVaquinhaDetails(vaquinha);
        setEditMode(true);
    };

    const handleRemove = (vaquinha) => {
        fetch(`http://localhost:8080/api/deleteVaquinha/${vaquinha.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    show("Vaquinha removida com sucesso", "success");
                    setVaquinhas(prevVaquinhas => prevVaquinhas.filter(v => v.id !== vaquinha.id));
                    setTimeout(() => {
                        window.location.href = "/listarVaquinha";
                    }, 3000);
                } else {
                    show("Erro ao remover a Vaquinha", "error");
                }
            })
            .catch(error => {
                show("Erro ao remover a campanha:", "error");
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVaquinhaDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSaveVaquinha = () => {
        if (vaquinhaDetails) {
            fetch(`http://localhost:8080/api/editVaquinha/${vaquinhaDetails.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vaquinhaDetails),
            })
                .then(response => response.json())
                .then(data => {
                    show("Vaquinha atualizada com sucesso", "success");
                    setVaquinhas(prevVaquinhas => prevVaquinhas.map(v => v.id === data.id ? data : v));
                    setEditMode(false);
                    setTimeout(() =>{
                        window.location.href="/listarVaquinha";
                    },3000);
                })
                .catch(error => {
                    show("Erro ao atualizar a campanha:", "error");
                });
        }
    };

    const handleToggleStatus = (vaquinhaId) => {
        fetch(`http://localhost:8080/api/toggleVaquinhaStatus/${vaquinhaId}`, {
            method: 'PATCH',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao alterar o status da vaquinha');
                }
                return response.json();
            })
            .then(data => {
                show("Estado da Vaquinha alterado com sucesso", "success");
                setVaquinhas(null);
                setTimeout(() =>{
                    window.location.href="/listarVaquinha";
                },3000);
            })
            .catch(error => {
                show("Erro ao alterar o status da vaquinha:", "error");
            });
    };

    const handleGerirContribuicoes = (vaquinha) => {
        fetch(`http://localhost:8080/contribuicao/contribuicoes/${vaquinha.id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Dados recebidos:", data); // Verifique a estrutura dos dados
                setContribuicoes(data); // Ajustado para lidar com a lista direta
                setShowContribuicoes(true);
            })
            .catch(error => {
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
            fetch(`http://localhost:8080/contribuicao/edit/${selectedContribuicao.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedContribuicao),
            })
                .then(response => response.json())
                .then(data => {
                    show("Contribuição atualizada com sucesso", "success");
                    setContribuicoes(prevContribuicoes =>
                        prevContribuicoes.map(c => c.id === data.id ? data : c)
                    );
                    setContribuicaoEditMode(false);
                    setSelectedContribuicao(null);
                })
                .catch(error => {
                    show("Erro ao atualizar a contribuição:", "error");
                });
        }
    };

    const handleRemoveContribuicao = (contribuicaoId) => {
        fetch(`http://localhost:8080/contribuicao/remove/${contribuicaoId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    show("Contribuição removida com sucesso", "success");
                    setContribuicoes(prevContribuicoes => prevContribuicoes.filter(c => c.id !== contribuicaoId));
                } else {
                    show("Erro ao remover a contribuição", "error");
                }
            })
            .catch(error => {
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
            <HeaderIn />
            <Toast ref={toast} style={{ padding: "20px" }} />

            <div className="p-mt-4">
                <DataTable value={vaquinhas} paginator rows={10} className="p-datatable-customers">
                    <Column field="titulo" header="Título" sortable></Column>
                    <Column field="descricao" header="Descrição" sortable></Column>
                    <Column field="quantia" header="Quantia" sortable></Column>
                    <Column field="subcategoria.nome" header="Subcategoria" sortable></Column>
                    <Column field="estado.estado" header="Estado" sortable></Column>
                    <Column body={(rowData) => (
                        <div className="p-d-flex p-ai-center">
                            <Button
                                label="Editar"
                                icon="pi pi-pencil"
                                onClick={() => handleEdit(rowData)}
                            />
                            <Button
                                label="Remover"
                                icon="pi pi-trash"
                                className="p-button-danger p-mr-2"
                                onClick={() => handleRemove(rowData)}
                            />
                            <Button
                                label={rowData.estado.estado === "ACTIVADO" ? "Desativar" : "Ativar"}
                                icon={rowData.estado.estado === "ACTIVADO" ? "pi pi-times" : "pi pi-check"}
                                className={`p-button-${rowData.estado.estado === "ACTIVADO" ? "danger" : "success"} p-mr-2`}
                                onClick={() => handleToggleStatus(rowData.id)}
                            />
                            <Button
                                label="Gerir Contribuições"
                                icon="pi pi-wallet"
                                className="p-button-info p-mr-2"
                                onClick={() => handleGerirContribuicoes(rowData)}
                            />
                        </div>
                    )} />
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
                style={{ width: '50vw' }}
                footer={<Button label="Fechar" icon="pi pi-times" onClick={hideContribuicoesDialog} />}
            >
                {contribuicoes.length > 0 ? (
                    <div>
                        <DataTable value={contribuicoes} paginator rows={10}>
                            <Column field="usuario.nome" header="Usuário" sortable />
                            <Column field="valor_monetario" header="Valor Monetário" sortable />
                            <Column field="contribuicoes.moedas" header="Moedas" sortable />
                            <Column field="data_criacao" header="Data" sortable />
                            <Column body={(rowData) => (
                                <div className="p-d-flex p-ai-center">
                                    <Button
                                        label="Editar"
                                        icon="pi pi-pencil"
                                        className="p-mr-2"
                                        onClick={() => handleEditContribuicao(rowData)}
                                    />
                                    <Button
                                        label="Remover"
                                        icon="pi pi-trash"
                                        className="p-button-danger p-mr-2"
                                        onClick={() => handleRemoveContribuicao(rowData.id)}
                                    />
                                </div>
                            )} />
                        </DataTable>

                        {contribuicaoEditMode && selectedContribuicao && (
                            <div className="p-mt-4">
                                <h3>Editar Contribuição</h3>
                                <div className="p-grid p-fluid">
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="valor">Valor</label>
                                        <InputText
                                            id="valor"
                                            value={selectedContribuicao.valor}
                                            onChange={(e) => setSelectedContribuicao(prev => ({ ...prev, valor: e.target.value }))}
                                        />
                                    </div>
                                    <div className="p-col-12 p-md-6">
                                        <label htmlFor="data">Data</label>
                                        <InputText
                                            id="data"
                                            value={selectedContribuicao.data}
                                            onChange={(e) => setSelectedContribuicao(prev => ({ ...prev, data: e.target.value }))}
                                        />
                                    </div>
                                    <Button
                                        label="Salvar"
                                        icon="pi pi-check"
                                        className="p-mt-2"
                                        onClick={() => {
                                            // Lógica para salvar a contribuição editada
                                            setContribuicaoEditMode(false);
                                            setSelectedContribuicao(null);
                                        }}
                                    />
                                    <Button
                                        label="Cancelar"
                                        icon="pi pi-times"
                                        className="p-mt-2 p-button-secondary"
                                        onClick={() => {
                                            setContribuicaoEditMode(false);
                                            setSelectedContribuicao(null);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Não há contribuições para mostrar.</p>
                )}
            </Dialog>
        </div>
    );
};

export default VaquinhaList;
