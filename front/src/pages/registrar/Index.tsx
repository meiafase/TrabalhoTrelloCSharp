import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Registrar = () => {

    const navigate = useNavigate();
    const [nomeUsuario , setNomeUsuario ] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [senhaUsuario , setSenhaUsuario ] = useState('');
    const [confirmSenhaUsuario , setConfirmSenhaUsuario ] = useState('');
    const [displayErro, setDisplayErro] = useState(false);
    const [msgErro, setMsgErro] = useState("");


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
        if (nomeUsuario !== "" && emailUsuario !== "" && senhaUsuario !== "" && confirmSenhaUsuario !== "") {
            if (senhaUsuario === confirmSenhaUsuario) {
                await Axios.post(`http://localhost:5129/api/usuario/cadastrar`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    nomeUsuario, emailUsuario, senhaUsuario
                }).then (response => {
                    if (response.status === 201) {
                        localStorage.removeItem('user');
                        localStorage.setItem("user", response.data.idUsuario);
                        navigate('../')
                    }
                })
            } else {
                setMsgErro("As senhas estão diferentes!");
                setDisplayErro(true)
            }
        } else {
            setMsgErro("Todos os campos precisam estar preenchidos!");
            setDisplayErro(true)
        }
    }


    return (
        <div className="loginContent">
            <Paper className="login">
                <h1>Cadastrar</h1>
                <hr />
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
                <div className="inputs">
                    <div className="input">
                        <TextField label="Nome" size="small" fullWidth onChange={e => setNomeUsuario(e.target.value)} variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField label="E-mail" size="small" fullWidth onChange={e => setEmailUsuario(e.target.value)} variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField label="Senha" size="small" fullWidth onChange={e => setSenhaUsuario(e.target.value)} type="password" variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField label="Confirmar Senha" size="small" fullWidth onChange={e => setConfirmSenhaUsuario(e.target.value)} type="password" variant="outlined" />
                    </div>
                    <div className="btn">
                        <Button variant="contained" color="success" onClick={handleSubmit} fullWidth>Enviar</Button>
                    </div>
                    <div className="criarConta">
                        <a href="http://localhost:3000/Login">Voltar á página de login</a>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default Registrar;
