import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar, { SnackbarCloseReason }  from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';

import '../login/Index.css';


type Quadro = {
    tituloQuadro: string;
    idQuadro: number;
};


const AdicionarTarefa = () => {
    const navigate = useNavigate();


    const [idUsuario, setIdusuario] = useState<number>();
    const [tituloTarefa, setTituloTarefa] = useState<string | undefined>(undefined);
    const [descricaoTarefa, setDescricaoTarefa] = useState<string | undefined>(undefined);
    const [quadro, setQuadro] = useState<string | undefined>(undefined);
    const [quadros, setQuadros] = useState<Quadro[]>([]);
    const [dataEntrega, setDataEntrega] = useState<Date | null>(null);
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
    
            if (user) {
                try {
                    const responseUsuario = await Axios.get(`http://localhost:5129/api/quadro/listar/${idUsuario}`, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    });
                    setQuadros(responseUsuario.data);
                } catch {

                }
            }
        }

        PegarSessao()
    }, [idUsuario, navigate])

    const handleChange = (event: SelectChangeEvent) => {
        setQuadro(event.target.value);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setDisplayErro(false);
      };

        const handleDateChange = (date: Date | null) => {
            setDataEntrega(date);
        };

    const handleSubmit = async () => {
        if (tituloTarefa !== undefined && descricaoTarefa !== undefined && quadro !== undefined && dataEntrega !== null) {
            const dataEntregaTarefa = new Date(dataEntrega)
            dataEntregaTarefa.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
            console.log(dataEntrega, dataEntregaTarefa)
            const responseTarefa = await Axios.post(`http://localhost:5129/api/tarefa/criar`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                "idUsuario": idUsuario, 
                "tituloTarefa": tituloTarefa,
                "descricaoTarefa": descricaoTarefa,
                "dataEntregaTarefa": dataEntregaTarefa,
                "idQuadro": quadro
            });


            if (responseTarefa.status === 201) {
                navigate('../')
            } 
        } else {
            setMsgErro("Todos os campos precisam ser preenchidos");
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
                <h1>Adicionar Tarefa</h1>
                <hr />
                <div className="inputs">
                    <div className="input">
                        <TextField label="Título da tarefa" onChange={e => setTituloTarefa(e.target.value)} size="small" fullWidth variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Descrição da tarefa"
                            fullWidth
                            onChange={e => setDescricaoTarefa(e.target.value)}
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
                                {quadros.map(quadro => (
                                    <MenuItem value={quadro.idQuadro}>{quadro.tituloQuadro}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="input">
                        <label>Entregar em:</label>
                        <DatePicker format="dd-MM-yyyy HH:mm:ss" style={{width: "100%"}} onChange={handleDateChange} editable={false} />
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