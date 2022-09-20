package com.example.barbershapp.DAO;

import android.content.Intent;
import android.util.Log;
import android.widget.ArrayAdapter;

import com.example.barbershapp.classes.Barbearia;
import com.example.barbershapp.classes.Barbeiro;
import com.example.barbershapp.classes.Usuario;

import java.util.ArrayList;

public class DAOBarbeiro{

    public static ArrayList<Barbeiro> banco = preencheDados();

    public ArrayList<Barbeiro> getTodosBarbeiros(){
        return banco;
    }

    public ArrayList<Barbeiro> getBarbeirosDaBarbearia(int idBarbearia){
        DAOBarbearia daobarbearia = new DAOBarbearia();
        ArrayList<Barbeiro> dados = banco;
        Barbearia barbearia = daobarbearia.getBarbearia(idBarbearia);
        ArrayList<Barbeiro> barbeirosEncontrados = new ArrayList<>();
        for(int i = 0; i < banco.size();i++){
            for(int o = 0; o < barbearia.getBarbeiros().size(); o++){
                if(banco.get(i).getId() == barbearia.getBarbeiros().get(o)){
                    barbeirosEncontrados.add(banco.get(i));
                }
            }
        }
        return barbeirosEncontrados;
    }

    public int getTotalFila(int idBarbeiro){
        return getBarbeiroPorId(idBarbeiro).getFila().size();
    }

    public int getPosicaoFila(int idBarbeiro, int idUsuario){
        ArrayList<Integer> fila = getBarbeiroPorId(idBarbeiro).getFila();
        for(int i = 0; i < fila.size(); i++){
            if(fila.get(i) == idUsuario){
                return i += 1;
            }
        }
        return 0;
    }

    public Barbeiro getBarbeiroPorId(int idBarbeiro){
        for(int i = 0; i < banco.size(); i++){
            if(banco.get(i).getId() == idBarbeiro){
                return banco.get(i);
            }
        }
        return null;
    }

    public void insertUsuarioFila(int barbeiro, int usuario){
        getBarbeiroPorId(barbeiro).addUsuarioFila(usuario);
    }

    public void removeUsuarioFila(int barbeiro, int usuario){
        getBarbeiroPorId(barbeiro).removeUsuarioFila(usuario);
    }

    public static ArrayList<Barbeiro> preencheDados(){
        ArrayList<Barbeiro> dados = new ArrayList<>();
        Barbeiro b1 = new Barbeiro(1,"Barbeiro 1", "barb1", "barbeiro1@b.com", "barbeiro1");
        Barbeiro b2 = new Barbeiro(2,"Barbeiro 2", "barb2", "barbeiro2@b.com", "barbeiro2");
        Barbeiro b3 = new Barbeiro(3,"Barbeiro 3", "barb3", "barbeiro3@b.com", "barbeiro3");
        Barbeiro b4 = new Barbeiro(4,"Barbeiro 4", "barb4", "barbeiro4@b.com", "barbeiro4");
        Barbeiro b5 = new Barbeiro(5,"Barbeiro 5", "barb5", "barbeiro5@b.com", "barbeiro5");
        Barbeiro b6 = new Barbeiro(6,"Barbeiro 6", "barb6", "barbeiro6@b.com", "barbeiro6");
        Barbeiro b7 = new Barbeiro(7,"Barbeiro 7", "barb7", "barbeiro7@b.com", "barbeiro7");
        Barbeiro b8 = new Barbeiro(8,"Barbeiro 8", "barb8", "barbeiro8@b.com", "barbeiro8");
        Barbeiro b9 = new Barbeiro(9,"Barbeiro 9", "barb9", "barbeiro9@b.com", "barbeiro9");
        Barbeiro b10 = new Barbeiro(10,"Barbeiro 10", "barb10", "barbeiro10@b.com", "barbeiro10");
        Barbeiro b11 = new Barbeiro(11,"Barbeiro 11", "barb11", "barbeiro11@b.com", "barbeiro12");
        Barbeiro b12 = new Barbeiro(12,"Barbeiro 12", "barb12", "barbeiro12@b.com", "barbeiro13");
        Barbeiro b13 = new Barbeiro(13,"Barbeiro 13", "barb13", "barbeiro13@b.com", "barbeiro14");
        Barbeiro b14 = new Barbeiro(14,"Barbeiro 14", "barb14", "barbeiro14@b.com", "barbeiro15");
        Barbeiro b15 = new Barbeiro(15,"Barbeiro 15", "barb15", "barbeiro15@b.com", "barbeiro16");
        Barbeiro b16 = new Barbeiro(16,"Barbeiro 16", "barb16", "barbeiro16@b.com", "barbeiro17");
        b1.setSituacao(2);
        b2.setSituacao(1);
        b3.setSituacao(3);
        b4.setSituacao(4);
        b5.setSituacao(2);
        b6.setSituacao(1);
        b7.setSituacao(3);
        b8.setSituacao(4);
        b9.setSituacao(2);
        b10.setSituacao(1);
        b11.setSituacao(3);
        b12.setSituacao(4);
        b13.setSituacao(2);
        b14.setSituacao(1);
        b15.setSituacao(3);
        b16.setSituacao(4);
        dados.add(b1);
        dados.add(b2);
        dados.add(b3);
        dados.add(b4);
        dados.add(b5);
        dados.add(b6);
        dados.add(b7);
        dados.add(b8);
        dados.add(b9);
        dados.add(b10);
        dados.add(b11);
        dados.add(b12);
        dados.add(b13);
        dados.add(b14);
        dados.add(b15);
        dados.add(b16);
        return dados;
    }

    public void insertBarbeiro(Barbeiro barbeiro){
        banco.add(barbeiro);
    }
}
