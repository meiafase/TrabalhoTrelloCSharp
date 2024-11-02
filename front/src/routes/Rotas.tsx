import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../pages/home/Index";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;