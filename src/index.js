import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter, Route, Routes, Navigate,
} from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Game from "./views/Game";
import Scores from "./views/Scores";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/game" element={<Game />} />
      <Route path="/scores" element={<Scores />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
