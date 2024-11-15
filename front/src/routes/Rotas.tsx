import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../pages/home/Index";
import Login from "../pages/login/Index";
import Registrar from "../pages/registrar/Index";
import AdicionarQuadro from "../pages/adicionarQuadro/AdicionarQuadro";
import AdicionarTarefa from "../pages/adicionarTarefa/AdicionarTarefa";
import EditarTarefa from "../pages/editarTarefa/Index";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Registrar" element={<Registrar />} />
                <Route path="/AdicionarQuadro" element={<AdicionarQuadro />} />
                <Route path="/AdicionarTarefa" element={<AdicionarTarefa />} />
                <Route path="/EditarTarefa/:IdTarefa" element={<EditarTarefa/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;