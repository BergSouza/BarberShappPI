package com.example.barbershapp.classes;

import java.util.ArrayList;

public class Barbeiro extends Usuario {
    int situacao;
    ArrayList<String> fila;

    public Barbeiro(String nome, String usuario, String email, String senha){
        super(nome,usuario,email,senha,"barbeiro");
        fila = new ArrayList<>();
    }

    public void setSituacao(int situacao){
        this.situacao = situacao;
    }
    public int getSituacao(){
        return this.situacao;
    }
    public void addUsuarioFila(String idUsuario){
        this.fila.add(idUsuario);
    }
    public String getPrimeiroUsuarioFila(){
        return this.fila.get(0);
    }
    public ArrayList<String> getFila(){
        return this.fila;
    }
    public boolean verificaUsuarioFila(int idUsuario){
        for(int i = 0; i < fila.size(); i++){
            if(fila.get(i).equals(idUsuario)){
                return true;
            }
        }
        return false;
    }
    public void removeUsuarioFila(int idUsuario){
        for(int i = 0; i < fila.size(); i++){
            if(fila.get(i).equals(idUsuario)){
                fila.remove(idUsuario);
            }
        }
    }
}
