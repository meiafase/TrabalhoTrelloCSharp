import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

import './Index.css'

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


type Quadro = {
    tituloQuadro: string;
    idQuadro: number;
};

const Home = () => {

    const navigate = useNavigate();
    
    const [idusuario, setIdusuario] = useState("");
    const [quadros, setQuadros] = useState<Quadro[]>([]);
    
    useEffect(() => {
        const pegarSessao = () => {
            let user = localStorage.getItem("user");
            if (user === null) {
                navigate("/Login");
            } else {
                setIdusuario(user);
            }
        }
        pegarSessao();
    }, [navigate])


    useEffect(() => {
        const pegarQuadros = async () => {
            await Axios.get(`http://localhost:5129/api/quadro/listar/2`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then (response => {
                setQuadros(response.data);
            })
        }
        pegarQuadros();
    }, [navigate, idusuario])
    
    
    const logout = () => {
        localStorage.removeItem("user");
        navigate("/Login")
    }

    return (
        <div className="global">
            <div className="content">
                <div className="title">
                    <h1>Board do Samuel</h1>
                </div>

                <div className="addTarefa">
                    <p>Você pode arrastar as tarefas entre os Quadros</p>
                    <Button variant="contained" size="small">Adicionar Quadro</Button>
                    <Button variant="contained" color="success" size="small">Adicionar Tarefa</Button>
                    <Button variant="contained" color="error" size="small" onClick={logout}>Logout</Button>
                </div>

                <div className="boards">
                    {quadros.length > 0 ? (
                        quadros.map((quadro, index) => (
                            <div key={index} id={String(quadro.idQuadro)} className="board boardAfazer">
                                <h1>{quadro.tituloQuadro}</h1>
                                <div className="card" draggable="true">
                                    <Card sx={{ width: "100%", marginBottom: "10px" }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Tarefa
                                                    </Typography>
                                                    <Typography gutterBottom variant="inherit" component="div">
                                                        Entrega: 01/11/2024 ás 16:24
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
                        <div>
                            vc nao possui quadros
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;