package com.example.barbershapp.classes;

public class Usuario {
    String id;
    String nome;
    String usuario;
    String email;
    String senha;
    String tipo;

    public Usuario(String nome, String usuario, String email, String senha, String tipo){
        this.nome = nome;
        this.usuario = usuario;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }
    public void setId(String id){
        this.id = id;
    }
    public String getId(){
        return this.id;
    }
    public void setNome(String nome){
        this.nome = nome;
    }
    public String getNome(){
        return this.nome;
    }
    public void setUsuario(String usuario){
        this.usuario = usuario;
    }
    public String getUsuario(){
        return this.usuario;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getEmail(){
        return this.email;
    }
    public void setSenha(String senha){
        this.senha = senha;
    }
    public String getSenha(){
        return this.senha;
    }
    public void setTipo(String tipo){
        this.tipo = tipo;
    }
    public String getTipo(){
        return this.tipo;
    }

}
