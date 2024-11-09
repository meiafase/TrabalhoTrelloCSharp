import React, { useEffect, useState } from "react";
import Axios from 'axios';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

interface ModalTarefaProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  idTarefa: number | undefined;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ openModal, setOpenModal, idTarefa }) => {

    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {

        if (idTarefa) {
            const PegarComentarios = async () => {
                const responseComentarios = await Axios.get(`http://localhost:5129/api/usuario/buscar/${idTarefa}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                console.log(responseComentarios.data)
                setComentarios(responseComentarios.data);
            }
    
            PegarComentarios();
        }
    }, [idTarefa])

    return (
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <DialogTitle>Tarefa Details {idTarefa}</DialogTitle>
                <DialogTitle variant="inherit">Prazo: 11/12 17:30</DialogTitle>
            </div>
            <Divider />
            <DialogContent>
            <div>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </Typography>
            </div>
            <Divider />
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="body1">Samuel Diel</Typography>
                                <Typography variant="body2" color="textSecondary">11/12 17:30</Typography>
                            </div>
                        } secondary="aqui vai a mensagem" />
                    </ListItem>
                    <hr />

                </List>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant="contained" size="small" color="primary">
                    Editar Tarefa
                </Button>
                <Button variant="contained" size="small" color="error">
                    Excluir Tarefa
                </Button>
            </DialogActions>
            <Divider />

            <Button variant="contained" size="small" onClick={() => setOpenModal(false)} color="success">
                Fechar
            </Button>
        </Dialog>
    );
};

export default ModalTarefa;