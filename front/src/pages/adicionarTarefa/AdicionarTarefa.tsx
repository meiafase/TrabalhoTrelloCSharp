import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import '../login/Index.css';


const AdicionarTarefa = () => {

    const [quadro, setQuadro] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setQuadro(event.target.value as string);
    };

    const handleSubmit = async () => {
    }

    return (
        <div className="loginContent">
            <Paper className="login">
                <h1>Adicionar Tarefa</h1>
                <hr />
                <div className="inputs">
                    <div className="input">
                        <TextField label="Título da tarefa" size="small" fullWidth variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Descrição da tarefa"
                            fullWidth
                            size="small"
                            multiline
                            maxRows={4}
                        />
                    </div>
                    <div className="input">
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Selecione o quadro</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={quadro}
                                label="Selecione o quadro"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Quadro 1</MenuItem>
                            </Select>
                        </FormControl>
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

export default AdicionarTarefa;