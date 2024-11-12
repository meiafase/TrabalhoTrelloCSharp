import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import ModalTarefa from "../components/ModalTarefa";
import DragAndDrop from './js.js';

import './Index.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Button, Typography } from "@mui/material";

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
    const [idTarefa, setIdTarefa] = useState<number | undefined>(undefined);

    useEffect(() => {
        DragAndDrop();
    })

    useEffect(() => {
        const pegarSessao = async () => {
            const user = localStorage.getItem("user");

            if (user === null) {
                navigate("/Login");
                return;
            }

            setIdusuario(Number(user));

            if (user) {
                try {
                    const responseUsuario = await Axios.get(`http://localhost:5129/api/usuario/buscar/${idUsuario}`, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    });
                    setUsuario(responseUsuario.data);

                    const responseQuadros = await Axios.get(`http://localhost:5129/api/quadro/listar/${idUsuario}`, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    });
                    setQuadros(responseQuadros.data);

                    const responseTarefas = await Axios.get(`http://localhost:5129/api/tarefa/listar/${idUsuario}`, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    });
                    setTarefas(responseTarefas.data);
                    console.log(responseTarefas.data)
                } catch (error) {
                    console.error("Erro:", error);
                }
            }
        };

        pegarSessao();
    }, [idUsuario]);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/Login");
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
                        quadros.map((quadro, index) => (
                            <div key={index} id={String(quadro.idQuadro)} className="board boardAfazer">
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                    <h3>{quadro.tituloQuadro}</h3>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <IconButton aria-label="deletar" sx={{ color: "red" }}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <hr style={{ height: "50%", marginTop: "15px" }} />
                                        <IconButton aria-label="editar" sx={{ color: "orange" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                {tarefas.map((tarefa) => (
                                    Number(tarefa.idQuadro) === Number(quadro.idQuadro) ? (
                                        <div className="card" draggable="true" id={`card_${tarefa.idTarefa}`}>
                                            <Card sx={{ width: "100%", marginBottom: "10px" }} onClick={() => {
                                                setIdTarefa(Number(tarefa.idTarefa));
                                                setOpenModal(true);
                                            }}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                {tarefa.tituloTarefa}
                                                            </Typography>
                                                        </div>
                                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                            {tarefa.descricaoTarefa}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                    ) : ("")
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>Você não possui quadros</div>
                    )}
                </div>
            </div>

            <ModalTarefa openModal={openModal} setOpenModal={setOpenModal} idTarefa={idTarefa} />
        </div>
    );
};

export default Home;
