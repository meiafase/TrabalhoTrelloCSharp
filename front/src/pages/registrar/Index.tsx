import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';



const Registrar = () => {

    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit = () => {

    }

    return (
        <div className="loginContent">
            <Paper className="login">
                <h1>Login</h1>
                <hr />
                <div className="inputs">
                    <div className="input">
                        <TextField label="Nome" size="small" fullWidth onChange={e => setNome(e.target.value)} variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField label="E-mail" size="small" fullWidth onChange={e => setEmail(e.target.value)} variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField label="Senha" size="small" fullWidth onChange={e => setPassword(e.target.value)} type="password" variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField label="Confirmar Senha" size="small" fullWidth onChange={e => setConfirmPassword(e.target.value)} type="password" variant="outlined" />
                    </div>
                    <div className="btn">
                        <Button variant="contained" color="success" fullWidth>Enviar</Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default Registrar;
