import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import ModalTarefa from "../components/ModalTarefa";

import './Index.css'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Button, Typography, Divider } from "@mui/material";


type Quadro = {
    tituloQuadro: string;
    idQuadro: number;
    idTarefa: number;
};

const Home: React.FC = () => {
    const navigate = useNavigate();

    const [idusuario, setIdusuario] = useState<string>("");
    const [quadros, setQuadros] = useState<Quadro[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [idTarefa, setIdTarefa] = useState<string | undefined>(undefined);

    useEffect(() => {
        const pegarSessao = () => {
            let user = localStorage.getItem("user");
            if (user === null) {
                navigate("/Login");
            } else {
                setIdusuario(user);
            }
        };
        pegarSessao();
    }, [navigate]);

    useEffect(() => {
        const pegarQuadros = async () => {
            await Axios.get(`http://localhost:5129/api/quadro/listar/${idusuario}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(response => {
                setQuadros(response.data);
            });
        };
        pegarQuadros();
    }, [navigate, idusuario]);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/Login");
    };

    return (
        <div className="global">
            <div className="content">
                <div className="title">
                    <h1>Board do Samuel</h1>
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
                                    <div style={{display: "flex", justifyContent: "space-between" }}>
                                        <IconButton aria-label="deletar" sx={{ color: "red" }}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <hr style={{height: "50%", marginTop: "15px"}} />
                                        <IconButton aria-label="editar" sx={{color: "orange"}}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="card" draggable="true">
                                    <Card sx={{ width: "100%", marginBottom: "10px" }} onClick={() => { 
                                        setIdTarefa(String(quadro.idTarefa)); 
                                        setOpenModal(true); 
                                    }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Tarefa
                                                    </Typography>
                                                    <Typography gutterBottom variant="inherit" component="div">
                                                        Entrega: 01/11 às 16:24
                                                    </Typography>
                                                </div>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
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