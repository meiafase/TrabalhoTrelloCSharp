import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


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


type Usuario = {
    nomeUsuario: string;
    idUsuario: number;
};

type Quadro = {
    tituloQuadro: string;
    idQuadro: number;
};

const EditarTarefa = () => {

    const navigate = useNavigate();


    const { IdTarefa } = useParams();
    const [tituloTarefa, setTituloTarefa] = useState("");
    const [DescricaoTarefa, setDescricaoTarefa] = useState("");
    const [dataEntrega, setDataEntrega] = useState<Date | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuario, setUsuario] = useState<string | undefined>(undefined);
    const [quadros, setQuadros] = useState<Quadro[]>([]);
    const [quadro, setQuadro] = useState<string | undefined>(undefined);
    const [displayErro, setDisplayErro] = useState(false);
    const [msgErro, setMsgErro] = useState("");

    useEffect(()=>{

        const PegarTarefa = async () => {

            try {
                const responseTarefa = await Axios.get(`http://localhost:5129/api/tarefa/buscar/${Number(IdTarefa)}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                setTituloTarefa(responseTarefa.data.tituloTarefa)
                setDescricaoTarefa(responseTarefa.data.descricaoTarefa)
                let data = new Date(responseTarefa.data.dataEntregaTarefa)
                setDataEntrega(data)
                setUsuario(responseTarefa.data.idUsuario)
                setQuadro(responseTarefa.data.idQuadro)
    
                const responseUsuario = await Axios.get(`http://localhost:5129/api/usuario/listar`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                setUsuarios(responseUsuario.data);
            } catch {}

            
        }

        PegarTarefa();
    },[IdTarefa]);




    useEffect(() => {
        const PegarQuadro = async () => {
            try {
                const responseQuadro = await Axios.get(`http://localhost:5129/api/quadro/listar/${usuario}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                setQuadros(responseQuadro.data);
            } catch {}
        }

        PegarQuadro();
    }, [usuario])


    const handleDateChange = (date: Date | null) => {
        setDataEntrega(date);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setQuadro(undefined)
        setUsuario(event.target.value);
    };

    const handleChangeQuadro = (event: SelectChangeEvent) => {
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

    const handleAtualizar = async () => {
        console.log(quadro)
        if (tituloTarefa !== "" && DescricaoTarefa !== "" && dataEntrega !== null && usuario !== undefined && quadro !== undefined) {
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

            const responseTarefa = await Axios.put(`http://localhost:5129/api/tarefa/atualizar/${IdTarefa}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                "idUsuario": usuario, 
                "tituloTarefa": tituloTarefa,
                "descricaoTarefa": DescricaoTarefa,
                "dataEntregaTarefa": dataEntregaTarefa,
                "idQuadro": quadro
            });

            if (responseTarefa.status === 200) {
                navigate('../');
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
                <h1>Editar Tarefa</h1>
                <hr />
                <div className="inputs">
                    <div className="input">
                        <TextField label="Título da tarefa" value={tituloTarefa}  onChange={e => setTituloTarefa(e.target.value)} size="small" fullWidth variant="outlined" />
                    </div>
                    <div className="input">
                        <TextField
                            id="outlined-multiline-flexible"
                            label= "Descrição da tarefa"
                            onChange={e => setDescricaoTarefa(e.target.value)}
                            value={DescricaoTarefa}
                            fullWidth 
                            size="small"
                            multiline
                            maxRows={4}
                        />
                    </div>
                    <div className="input">
                        <label>Entregar em:</label>
                        <DatePicker format="dd-MM-yyyy HH:mm:ss" style={{width: "100%"}} value={dataEntrega} onChange={handleDateChange} editable={false} />
                    </div>
                    <div className="input">
                        <FormControl size="small" fullWidth>
                            <InputLabel id="responsavel-select-label">Selecione o responsável</InputLabel>
                            <Select
                                labelId="responsavel-select-label"
                                id="responsavel-select"
                                value={usuario || ""} // Valor padrão para evitar erros
                                onChange={handleChange}
                                label="Selecione o responsável"
                            >
                                {usuarios && usuarios.length > 0 ? (
                                    usuarios.map((usuario) => (
                                        <MenuItem key={usuario.idUsuario} value={usuario.idUsuario}>
                                            {usuario.nomeUsuario}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum responsável disponível</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="input">
                        <FormControl size="small" fullWidth>
                            <InputLabel id="responsavel-select-label">Selecione o quadro</InputLabel>
                            <Select
                                labelId="responsavel-select-label"
                                id="responsavel-select"
                                value={quadro || ""} // Valor padrão para evitar erros
                                onChange={handleChangeQuadro}
                                label="Selecione o quadro"
                            >
                                {quadros && quadros.length > 0 ? (
                                    quadros.map((quadro) => (
                                        <MenuItem key={quadro.idQuadro} value={quadro.idQuadro}>
                                            {quadro.tituloQuadro}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>Nenhum quadro disponível</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="btn">
                    <Button variant="contained" color="success" fullWidth onClick={(handleAtualizar)}>Atualizar</Button>
                </div>
                <div className="criarConta">
                    <a href="http://localhost:3000/">Voltar ao início</a>
                </div>
            </Paper>
        </div>
    );
}

export default EditarTarefa;