package com.example.barbershapp.DAO;

import com.example.barbershapp.classes.Usuario;

import java.util.ArrayList;

public class DAOContas {
    //public static ArrayList<Usuario> contas = preencherDados();
    public static int usuarioLogado = 0;

    public boolean verificaLogin(String usuarioemail, String senha){
        DAOUsuario daoUsuario = new DAOUsuario();
        DAOBarbeiro daoBarbeiro = new DAOBarbeiro();
        for(int i = 0; i < daoUsuario.getUsuarios().size(); i++){
            if((daoUsuario.getUsuarios().get(i).getUsuario().equals(usuarioemail)) || (daoUsuario.getUsuarios().get(i).getEmail().equals(usuarioemail))){
                if(daoUsuario.getUsuarios().get(i).getSenha().equals(senha)){
                    return true;
                }
            }
        }
        for(int i = 0; i < daoBarbeiro.getTodosBarbeiros().size(); i++){
            if((daoBarbeiro.getTodosBarbeiros().get(i).getUsuario().equals(usuarioemail)) || (daoBarbeiro.getTodosBarbeiros().get(i).getEmail().equals(usuarioemail))){
                if(daoBarbeiro.getTodosBarbeiros().get(i).getSenha().equals(senha)){
                    return true;
                }
            }
        }
        return false;
    }

    private static ArrayList<Usuario> preencherDados() {
        ArrayList<Usuario> usuarios = new ArrayList<>();

        DAOUsuario daoUsuario = new DAOUsuario();
        DAOBarbeiro daoBarbeiro = new DAOBarbeiro();
        for (int i = 0; i < daoUsuario.getUsuarios().size(); i++) {
            usuarios.add(daoUsuario.getUsuarios().get(i));
        }
        for (int i = 0; i < daoBarbeiro.getTodosBarbeiros().size(); i++) {
            usuarios.add(daoBarbeiro.getTodosBarbeiros().get(i));
        }
        return usuarios;
    }
}
