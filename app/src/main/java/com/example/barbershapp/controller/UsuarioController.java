package com.example.barbershapp.controller;

import com.example.barbershapp.DAO.DAOUsuario;
import com.example.barbershapp.classes.Usuario;

public class UsuarioController {
    DAOUsuario daousuario = new DAOUsuario();

    public boolean insertUsuario(Usuario newUser) {
        return daousuario.insertUsuario(newUser);
    }
}
