import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../pages/home/Index";
import Login from "../pages/login/Index";
import Registrar from "../pages/registrar/Index";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Registrar" element={<Registrar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;