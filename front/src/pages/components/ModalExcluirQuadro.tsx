import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from "@mui/material";
import Axios from 'axios';


interface ExcluirQuadroProps {
    openModalExcluir: boolean;
    setOpenModalExcluir: React.Dispatch<React.SetStateAction<boolean>>;
    idQuadro: number | undefined;
  }

const ModalExcluirQuadro: React.FC<ExcluirQuadroProps> = ({ openModalExcluir, setOpenModalExcluir, idQuadro }) => {

    const handleClose = () => {
        setOpenModalExcluir(false);
      };

    const handleDelete = async () => {
        await Axios.delete(`http://localhost:5129/api/quadro/deletar/${idQuadro}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
        handleClose();
    }

    return (
        <React.Fragment>
            <Dialog
                open={openModalExcluir}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Tem certeza de que deseja excluir este quadro?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Atenção!
                    Você está prestes a excluir este quadro. Todas as tarefas vinculadas a ele serão permanentemente excluídas e não poderão ser recuperadas.
                    Tem certeza de que deseja continuar?
                </DialogContentText>
                </DialogContent> 
                <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained" size="small">Não</Button>
                <Button onClick={handleDelete} color="success" variant="contained" size="small">Sim</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalExcluirQuadro;