import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import '../login/Index.css';


const AdicionarQuadro = () => {

    const handleSubmit = async () => {
    }

    return (
        <div className="loginContent">
            <Paper className="login">
                <h1>Adicionar Quadro</h1>
                <hr />
                <div className="inputs">
                    <div className="input">
                        <TextField label="Nome do quadro" size="small" fullWidth variant="outlined" />
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