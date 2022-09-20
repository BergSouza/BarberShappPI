package com.example.barbershapp.controller;

import com.example.barbershapp.DAO.DAOBarbearia;
import com.example.barbershapp.classes.Barbearia;

import java.util.ArrayList;

public class BarbeariaController {
    DAOBarbearia daobarbearia = new DAOBarbearia();

    public ArrayList<Barbearia> getBarbearias() {
        return daobarbearia.getBarbearias();
    }

    public ArrayList<String> pegaNomes(ArrayList<Barbearia> barbearias) {
        ArrayList<String> dados = new ArrayList<>();
        for(int i = 0; i < barbearias.size();i++){
            dados.add(barbearias.get(i).getNome());
        }
        return dados;
    }

    public String getNome(int id){
        return getBarbearia(id).getNome();
    }
    public String getEndereco(int id){
        return getBarbearia(id).getEndereco();
    }
    public String getContato(int id){
        return getBarbearia(id).getContato();
    }
    public String getHorarioFuncionamento(int id){
        return getBarbearia(id).getHorarioFuncionamento();
    }
    public String getFormasPagamento(int id){
        return getBarbearia(id).getFormasPagamento();
    }
    public Barbearia getBarbearia(int id){
        ArrayList<Barbearia> dados = new ArrayList<>();
        dados = this.getBarbearias();
        for(int i = 0; i < dados.size();i++){
            if(dados.get(i).getId() == id){
                return dados.get(i);
            }
        }
        return null;
    }

    public String getSituacao(int idBarbearia) {
        return this.getBarbearia(idBarbearia).getSituacao();
    }
}
