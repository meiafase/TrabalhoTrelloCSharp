import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from "@mui/material";
import Axios from 'axios';
import TextField from '@mui/material/TextField';


interface EditarQuadroProps {
    openModalEditar: boolean;
    setOpenModalEditar: React.Dispatch<React.SetStateAction<boolean>>;
    idQuadro: number | undefined;
  }

const ModalEditarQuadro: React.FC<EditarQuadroProps> = ({ openModalEditar, setOpenModalEditar, idQuadro }) => {

    const [tituloQuadro, setTituloQuadro] = useState("");

    useEffect(() => {
        if (idQuadro) {
            const getQuadro = async () => {
                const resultQuadro = await Axios.get(`http://localhost:5129/api/quadro/buscar/${idQuadro}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                })
    
                setTituloQuadro(resultQuadro.data.tituloQuadro);
            }
    
            getQuadro();
        }

    }, [idQuadro])

    const handleClose = () => {
        setOpenModalEditar(false);
      };

    const handleEditar = async () => {
        await Axios.put(`http://localhost:5129/api/quadro/atualizar/${idQuadro}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            "tituloQuadro": tituloQuadro,
        });
        handleClose();
    }

    return (
        <React.Fragment>
            <Dialog
                open={openModalEditar}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                {"Editar título do quadro"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className="input">
                        <TextField label="Título da tarefa" size="small" fullWidth value={tituloQuadro} onChange={e => setTituloQuadro(e.target.value)} variant="outlined" />
                    </div>
                </DialogContentText>
                </DialogContent> 
                <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained" size="small">Cancelar</Button>
                <Button onClick={handleEditar} color="success" variant="contained" size="small">Editar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalEditarQuadro;