import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import DialogContentText from '@mui/material/DialogContentText';


interface ModalTarefaProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  idTarefa: number | undefined;
}

type Comentario = {
    comentario: string;
    usuarioNome: string;
    criadoEm: string;
};

const ModalTarefa: React.FC<ModalTarefaProps> = ({ openModal, setOpenModal, idTarefa }) => {
    const navigate = useNavigate();


    const [idUsuario, setIdusuario] = useState<number>();
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [comentario, setComentario] = useState<string | null>(null);
    const [tituloTarefa, setTituloTarefa] = useState();
    const [dataEntrega, setDataEntrega] = useState("");
    const [descTarefa, setDescTarefa] = useState();

    useEffect(() => {
        const PegarSessao = async () => {
            const user = localStorage.getItem("user");

            // Verifica se o usuário está logado
            if (user === null) {
                navigate("/Login");
                return;
            }

            setIdusuario(Number(user));

        }

        PegarSessao()
    }, [idUsuario, navigate])

    const AdicionarComentario = async () => {

        if (comentario !== null && comentario !== "") {
            await Axios.post(`http://localhost:5129/api/comentario/cadastrar`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                "idUsuario": idUsuario,
                "idTarefa": idTarefa,
                "comentario": comentario,
            });
        }
        setComentario(null);
    }

    useEffect(() => {

        if (idTarefa) {
            const PegarComentarios = async () => {
                const responseTarefa = await Axios.get(`http://localhost:5129/api/tarefa/buscar/${idTarefa}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                setTituloTarefa(responseTarefa.data.tituloTarefa)
                setDescTarefa(responseTarefa.data.descricaoTarefa)
                if (responseTarefa.data.dataEntregaTarefa !== null) {
                    const dt = `${responseTarefa.data.dataEntregaTarefa.split("T")[0].split("-")[2]}/${responseTarefa.data.dataEntregaTarefa.split("T")[0].split("-")[1]}/${responseTarefa.data.dataEntregaTarefa.split("T")[0].split("-")[0]} ${responseTarefa.data.dataEntregaTarefa.split("T")[1].split(":")[0]}:${responseTarefa.data.dataEntregaTarefa.split("T")[1].split(":")[1]}:${responseTarefa.data.dataEntregaTarefa.split("T")[1].split(":")[2].split("-")[0]}`
                    setDataEntrega(dt)
                } else {
                    setDataEntrega("")
                }

                const responseComentario = await Axios.get(`http://localhost:5129/api/comentario/listar/${idTarefa}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                console.log(responseComentario.data)
                setComentarios(responseComentario.data)
            }
    
            PegarComentarios();
        }
    }, [idTarefa, comentario])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleDelete = async () => {
        await Axios.delete(`http://localhost:5129/api/tarefa/deletar/${idTarefa}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
        handleClose();
        setOpenModal(false)
    }
    

    return (
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <DialogTitle>{tituloTarefa}</DialogTitle>
                <DialogTitle variant="inherit">Prazo: {dataEntrega} </DialogTitle>
            </div>
            <Divider />
            <DialogContent sx={{ minWidth: 400, padding: 2 }}>
            <div style={{marginBottom: "15px"}}>
                <Typography gutterBottom>
                    {descTarefa}
                </Typography>
            <Divider />
            </div>
                {comentarios.map(comentario => (
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <ListItem sx={{ padding: '1px 3px', height: '28px' }}>
                            <ListItemAvatar>
                                <Avatar sx={{ width: 30, height: 30 }}>
                                    <PersonIcon sx={{ fontSize: '1.5rem' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="body1" sx={{ fontSize: '0.875rem', lineHeight: '1.2' }}>
                                            {comentario.usuarioNome}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                                            {`${comentario.criadoEm.split("T")[0].split("-")[2]}/${comentario.criadoEm.split("T")[0].split("-")[1]}/${comentario.criadoEm.split("T")[0].split("-")[0]} ${comentario.criadoEm.split("T")[1].split(":")[0]}:${comentario.criadoEm.split("T")[1].split(":")[1]}:${comentario.criadoEm.split("T")[1].split(":")[2].split('.')[0]}`}
                                        </Typography>
                                    </div>
                                }
                                secondary={
                                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                        {comentario.comentario}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <hr />
                    </List>
                ))}
            <Divider />
                <div className="input" style={{marginBottom: "50px"}}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Escreva seu comentário..."
                            multiline
                            maxRows={4}
                            value={comentario}
                            onChange={e => setComentario(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} onClick={AdicionarComentario} aria-label="search">
                            <SendIcon sx={{color: 'black'}} />
                        </IconButton>
                    </Paper>
                </div>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" size="small" onClick={()=> navigate(`/EditarTarefa/${idTarefa}`) } color="primary">
                    Editar Tarefa
                </Button>
                <Button variant="contained" size="small" onClick={handleClickOpen} color="error">
                    Excluir Tarefa
                </Button>
            </DialogActions>
            <Divider />

            <Button variant="contained" size="small" onClick={() => setOpenModal(false)} color="success">
                Fechar
            </Button>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Tem certeza de que deseja excluir esta tarefa?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ao confirmar a exclusão, todos os dados associados a esta tarefa serão permanentemente removidos. Isso inclui qualquer progresso registrado, informações detalhadas ou comentários vinculados.

                        Você deseja continuar com a exclusão?
                    </DialogContentText>
                    </DialogContent> 
                    <DialogActions>
                    <Button onClick={handleClose} color="error" variant="contained" size="small">Não</Button>
                    <Button onClick={handleDelete} color="success" variant="contained" size="small">Sim</Button>
                    </DialogActions>
                </Dialog>
                </React.Fragment>
        </Dialog>
        
    );
};

export default ModalTarefa;