import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import ModalTarefa from "../components/ModalTarefa";
import './Index.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Button, Typography } from "@mui/material";
import ModalExcluirQuadro from "../components/ModalExcluirQuadro";
import ModalEditarQuadro from "../components/ModalEditarQuadro";

type Quadro = {
    tituloQuadro: string;
    idQuadro: number;
};

type Tarefa = {
    tituloTarefa: string;
    idQuadro: number;
    descricaoTarefa: string;
    idTarefa: number;
};

type Usuario = {
    nomeUsuario: string;
};

const Home = () => {
    const navigate = useNavigate();

    const [idUsuario, setIdusuario] = useState<number>();
    const [quadros, setQuadros] = useState<Quadro[]>([]);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalExcluir, setOpenModalExcluir] = useState<boolean>(false);
    const [openModalEditar, setOpenModalEditar] = useState<boolean>(false);
    const [idTarefa, setIdTarefa] = useState<number | undefined>(undefined);
    const [idQuadro, setIdQuadro] = useState<number | undefined>(undefined);

    useEffect(() => {
        const pegarSessao = async () => {
            const user = localStorage.getItem("user");
            setIdusuario(Number(user));

            if (user === null) {
                navigate("/Login");
                return;
            }

            setTimeout(async () => {
                if (idUsuario) {
                    try {
                        const responseUsuario = await Axios.get(`http://localhost:5129/api/usuario/buscar/${idUsuario}`);
                        setUsuario(responseUsuario.data);
    
                        const responseQuadros = await Axios.get(`http://localhost:5129/api/quadro/listar/${idUsuario}`);
                        setQuadros(responseQuadros.data);
    
                        const responseTarefas = await Axios.get(`http://localhost:5129/api/tarefa/listar/${idUsuario}`);
                        setTarefas(responseTarefas.data);
                    } catch (error) {
                        console.error("Erro:", error);
                    }
                }
              }, 0);
        };

        pegarSessao();
    }, [idUsuario, navigate, openModal, openModalExcluir, openModalEditar]);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/Login");
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, tarefa: Tarefa) => {
        e.dataTransfer.setData("tarefaId", tarefa.idTarefa.toString());
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, quadroId: number) => {
        e.preventDefault();
        const tarefaId = e.dataTransfer.getData("tarefaId");

        setTarefas((prevTarefas) => {
            return prevTarefas.map((tarefa) => {
                if (tarefa.idTarefa === Number(tarefaId)) {
                    return { ...tarefa, idQuadro: quadroId };
                }
                return tarefa;
            });
        });

        try {
            await Axios.put(`http://localhost:5129/api/tarefa/atualizar/quadro/${tarefaId}/`, {
                IdQuadro: quadroId,
            });
        } catch (error) {
            console.error("Erro ao mover tarefa:", error);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="global">
            <div className="content">
                <div className="title">
                    <h1>Board do {usuario?.nomeUsuario}</h1>
                </div>

                <div className="addTarefa">
                    <p>Você pode arrastar as tarefas entre os Quadros</p>
                    <Button variant="contained" size="small" onClick={() => navigate('../AdicionarQuadro')}>Adicionar Quadro</Button>
                    <Button variant="contained" color="success" size="small" onClick={() => navigate('../AdicionarTarefa')}>Adicionar Tarefa</Button>
                    <Button variant="contained" color="error" size="small" onClick={logout}>Logout</Button>
                </div>

                <div className="boards">
                    {quadros.length > 0 ? (
                        quadros.map((quadro) => (
                            <div
                                key={quadro.idQuadro}
                                id={`quadro_${quadro.idQuadro}`}
                                className="board boardAfazer"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, quadro.idQuadro)}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h3>{quadro.tituloQuadro}</h3>
                                    <div style={{ display: "flex" }}>
                                        <IconButton aria-label="deletar" sx={{ color: "red" }} onClick={() => {
                                            setIdQuadro(quadro.idQuadro);
                                            setOpenModalExcluir(true);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="editar" sx={{ color: "orange" }} onClick={() => {
                                            setIdQuadro(quadro.idQuadro);
                                            setOpenModalEditar(true);
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                {tarefas.filter((tarefa) => tarefa.idQuadro === quadro.idQuadro).map((tarefa) => (
                                    <div
                                        key={tarefa.idTarefa}
                                        className="card"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, tarefa)}
                                    >
                                        <Card sx={{ marginBottom: "10px" }} onClick={() => {
                                            setIdTarefa(tarefa.idTarefa);
                                            setOpenModal(true);
                                        }}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5">
                                                        {tarefa.tituloTarefa}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {tarefa.descricaoTarefa}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>Você não possui quadros</div>
                    )}
                </div>
            </div>

            <ModalTarefa openModal={openModal} setOpenModal={setOpenModal} idTarefa={idTarefa} />
            <ModalExcluirQuadro openModalExcluir={openModalExcluir} setOpenModalExcluir={setOpenModalExcluir} idQuadro={idQuadro} />
            <ModalEditarQuadro openModalEditar={openModalEditar} setOpenModalEditar={setOpenModalEditar} idQuadro={idQuadro} />
        </div>
    );
};

export default Home;