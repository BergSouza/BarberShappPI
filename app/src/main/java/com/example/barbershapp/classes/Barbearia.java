package com.example.barbershapp.classes;

import android.view.View;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class Barbearia {
    String id;
    String nome;
    ArrayList<String> barbeiros;
    String endereco;
    double lat;
    double lng;
    String contato;
    String horarioFuncionamento;
    String formasPagamento;
    String situacao;
    String idDono;

    private FirebaseAuth mAuth;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();

    public Barbearia(){

    }

    public Barbearia(String nome, String idDono){
        mAuth = FirebaseAuth.getInstance();

        this.nome = nome;
        this.idDono = idDono;

        barbeiros = new ArrayList<>();
    }

    public void setNome(String nome){
        this.nome = nome;
    }
    public String getNome(){
        return this.nome;
    }
    public void addBarbeiro(String id){
        this.barbeiros.add(id);
    }
    public void removeBarbeiro(String id){
        for(int i = 0; i < this.barbeiros.size();i++) {
            if (this.barbeiros.get(i).equals(id)) {
                this.barbeiros.remove(i);
            }
        }
    }
    public ArrayList<String> getBarbeiros(){
        return this.barbeiros;
    }
    public void setIdDono(String idDono){
        this.idDono = idDono;
    }
    public String getIdDono(){
        return this.idDono;
    }
    public void setId(String id){
        this.id = id;
    }
    public String getId(){
        return this.id;
    }
    public void setEndereco(String endereco){
        this.endereco = endereco;
    }
    public String getEndereco(){
        return this.endereco;
    }
    public void setLatLng(double lat, double lng){this.lat = lat; this.lng = lng;}
    public double getLat(){return this.lat;}
    public double getLng(){return this.lng;}
    public void setContato(String contato){
        this.contato = contato;
    }
    public String getContato(){
        return this.contato;
    }
    public void setHorarioFucionamento(String horarioFucionamento){
        this.horarioFuncionamento = horarioFucionamento;
    }
    public String getHorarioFuncionamento(){
        return this.horarioFuncionamento;
    }
    public void setFormasPagamento(String formasPagamento){
        this.formasPagamento = formasPagamento;
    }
    public String getFormasPagamento(){
        return this.formasPagamento;
    }
    public void setSituacao(String situacao){
        this.situacao = situacao;
    }
    public String getSituacao() {
        return this.situacao;
    }

    public void salva(){
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference();
        String idGen = myRef.child("barbearias").push().getKey();
        this.id = idGen;
        Barbearia barbAux = this;
        myRef.child("usuarios").child(mAuth.getCurrentUser().getUid()).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                //barbAux.addBarbeiro(mAuth.getCurrentUser().getUid());
                myRef.child("barbearias").child(idGen).setValue(barbAux);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                // Failed to read value
                //Log.w(TAG, "Failed to read value.", error.toException());
            }
        });
    }
}
