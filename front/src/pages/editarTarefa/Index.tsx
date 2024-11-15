import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
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

const EditarTarefa = () => {

    const { IdTarefa } = useParams();
    const [tituloTarefa, setTituloTarefa] = useState("");
    const [DescricaoTarefa, setDescricaoTarefa] = useState("");
    useEffect(()=>{

        const PegarTarefa = async () => {

            const responseTarefa = await Axios.get(`http://localhost:5129/api/tarefa/buscar/${Number(IdTarefa)}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
            setTituloTarefa(responseTarefa.data.tituloTarefa)
            setDescricaoTarefa(responseTarefa.data.descricaoTarefa)
        }
        PegarTarefa()
    },[IdTarefa])

    return (
        <div className="loginContent">
     
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
                            value={DescricaoTarefa}
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
                               
                                label="Selecione o quadro"
                                
                            >
                                {/* {quadros.map(quadro => (
                                    <MenuItem value={quadro.idQuadro}>{quadro.tituloQuadro}</MenuItem>
                                ))} */}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="input">
                        <label>Entregar em:</label>
                        <DatePicker format="dd-MM-yyyy HH:mm:ss" style={{width: "100%"}}  editable={false} />
                    </div>
                </div>
                <div className="btn">
                    <Button variant="contained" color="success" fullWidth>Atualizar</Button>
                </div>
                <div className="criarConta">
                    <a href="http://localhost:3000/">Voltar ao início</a>
                </div>
            </Paper>
        </div>
    );
}

export default EditarTarefa;