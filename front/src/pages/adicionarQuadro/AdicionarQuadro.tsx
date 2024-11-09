import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Snackbar, { SnackbarCloseReason }  from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import '../login/Index.css';


const AdicionarQuadro = () => {
    const navigate = useNavigate();

    const [idUsuario, setIdusuario] = useState<number>();
    const [nomeQuadro, setNomeQuadro] = useState<string | undefined>(undefined);
    const [displayErro, setDisplayErro] = useState(false);
    const [msgErro, setMsgErro] = useState("");


    useEffect(() => {
        const PegarSessao = async () => {
            const user = localStorage.getItem("user");
    
            // Verifica se o usuário está logado
            if (user === null) {
                navigate("/Login");
                return;
            }
    
            setIdusuario(Number(user));
        }

        PegarSessao()
    }, [idUsuario, navigate])

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setDisplayErro(false);
      };

    const handleSubmit = async () => {

        if (nomeQuadro !== undefined) {
            const responseQuadro = await Axios.post(`http://localhost:5129/api/quadro/criar`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                "idUsuario": idUsuario,
                "tituloQuadro": nomeQuadro
            });

            if (responseQuadro.status === 201) {
                navigate('../');
            } else {
                setMsgErro("O usuário já possui o máximo de 4 quadros.");
                setDisplayErro(true)
            }
        } else {
            setMsgErro("Todos os campos precisam ser preenchidos!");
            setDisplayErro(true)
        }
    }

    return (
        <div className="loginContent">
            <Snackbar open={displayErro} autoHideDuration={5000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
                >
                {msgErro}
                </Alert>
            </Snackbar>
            <Paper className="login">
                <h1>Adicionar Quadro</h1>
                <hr />
                <div className="inputs">
                    <div className="input">
                        <TextField label="Nome do quadro" onChange={e => setNomeQuadro(e.target.value)} size="small" fullWidth variant="outlined" />
                    </div>
                </div>
                <div className="btn">
                    <Button variant="contained" color="success" onClick={handleSubmit} fullWidth>Adicionar</Button>
                </div>
                <div className="criarConta">
                    <a href="http://localhost:3000/">Voltar ao início</a>
                </div>
            </Paper>
        </div>
    );
}

export default AdicionarQuadro;