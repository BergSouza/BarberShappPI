package com.example.barbershapp.DAO;

import com.example.barbershapp.classes.Barbeiro;
import com.example.barbershapp.classes.Usuario;

import java.util.ArrayList;

public class DAOUsuario {

    public static ArrayList<Usuario> banco = preencheDados();

    public ArrayList<Usuario> getUsuarios(){
        return banco;
    }

    public static ArrayList<Usuario> preencheDados(){
        ArrayList<Usuario> dados = new ArrayList<>();
        Usuario u1 = new Usuario(51,"usuario 1", "usu1", "usuario1@u.com","usuario1");
        Usuario u2 = new Usuario(52,"usuario 2", "usu2", "usuario2@u.com","usuario2");
        Usuario u3 = new Usuario(53,"usuario 3", "usu3", "usuario3@u.com","usuario3");
        Usuario u4 = new Usuario(54,"usuario 4", "usu4", "usuario4@u.com","usuario4");
        dados.add(u1);
        dados.add(u2);
        dados.add(u3);
        dados.add(u4);
        return dados;
    }

    public boolean insertUsuario(Usuario usuario){
        for(int i = 0; i < banco.size(); i++){
            if(banco.get(i).getUsuario().equals(usuario.getUsuario())){
                return false;
            }else{
                if(banco.get(i).getEmail().equals(usuario.getEmail())){
                    return false;
                }else{
                    usuario.setId(banco.get(banco.size()-1).getId()+1);
                    banco.add(usuario);
                    return true;
                }
            }
        }
        return false;
    }
}
