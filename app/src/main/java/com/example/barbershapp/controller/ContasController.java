package com.example.barbershapp.controller;

import com.example.barbershapp.DAO.DAOContas;

public class ContasController {
    DAOContas daocontas = new DAOContas();

    public boolean verificaLogin(String usuarioEmail, String senha) {
        return daocontas.verificaLogin(usuarioEmail, senha);
    }
}
