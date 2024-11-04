import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import './Index.css';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async () => {
        await Axios.post(`http://localhost:5129/api/usuario/login`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            "EmailUsuario":email,
            "SenhaUsuario": password,
        }).then (response => {
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem("user", response.data.idUsuario);
                navigate('../')
            }
        })
    }

    return (
        <div className="loginContent">
            <Paper className="login">
                <h1>Login</h1>
                <hr />
                <div className="inputs">
                    <div className="input">
                        <TextField label="E-mail" size="small" fullWidth onChange={e => setEmail(e.target.value)} variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField label="Senha" size="small" fullWidth onChange={e => setPassword(e.target.value)} type="password" variant="outlined" />
                    </div>
                    <div className="btn">
                        <Button variant="contained" color="success" onClick={handleSubmit} fullWidth>Enviar</Button>
                    </div>
                    <div className="criarConta">
                        <a href="http://localhost:3000/Registrar">Não possui uma conta? Clique aqui</a>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default Login;
