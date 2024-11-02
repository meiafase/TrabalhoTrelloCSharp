import React from "react";
import './Index.css'

import Button from '@mui/material/Button';

const Home = () => {
    return (
        <div className="global">
            <div className="content">
                <div className="title">
                    <h1>Board do Samuel</h1>
                </div>

                <div className="addTarefa">
                    <p>Você pode arrastar as tarefas entre os Quadros</p>
                    <Button variant="contained" color="success" size="small">Adicionar Tarefa</Button>
                    <Button variant="contained" color="error" size="small">Logout</Button>
                </div>

                <div className="boards">
                    <div id="boardAfazer" className="board boardAfazer">
                        <h1>A Fazer</h1>
                        <div className="card" draggable="true"></div>
                    </div>

                    <div id="boardFazendo" className="board boardFazendo">
                        <h1>Fazendo</h1>
                        <div className="card" draggable="true"></div>
                    </div>
                    
                    <div id="boardFeito" className="board boardFeito">
                        <h1>Feito</h1>
                        <div className="card" draggable="true"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;