package com.example.barbershapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import com.example.barbershapp.classes.Barbearia;
import com.example.barbershapp.classes.Usuario;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class BarbeiroGerenciaActivity extends AppCompatActivity {

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();
    private FirebaseAuth mAuth;
    ArrayList<Barbearia> barbearias;
    ArrayList<String> barbeariasNomes;
    Button btnCadastrar;
    ListView lista;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_barbeiro_gerencia);
        mAuth = FirebaseAuth.getInstance();

        lista = findViewById(R.id.lvMinhasBarbearias);

        btnCadastrar = findViewById(R.id.btnAdicionarBarb);

        lista.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                acessarBarbearia(barbearias.get(position).getId());
            }
        });

        myRef.child("barbearias").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                barbearias = new ArrayList<>();
                for(DataSnapshot data: dataSnapshot.getChildren()){
                    boolean estaNaBarbearia = false;
                    for(DataSnapshot data2: data.child("barbeiros").getChildren()){
                        if(data2.getKey().equals(mAuth.getCurrentUser().getUid())){
                            estaNaBarbearia = true;
                        }
                    }
                    if((data.child("idDono").getValue(String.class)).equals(mAuth.getCurrentUser().getUid()) || estaNaBarbearia){
                        Barbearia barbAux = new Barbearia(data.child("nome").getValue(String.class),data.child("idDono").getValue(String.class));
                        barbAux.setId(data.child("id").getValue(String.class));
                        barbearias.add(barbAux);
                    }
                }
                atualizaLista();
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void irParaCadastrarBarbearia(View view){
        Intent i = new Intent(BarbeiroGerenciaActivity.this, CadastroBarbeariaActivity.class);
        startActivity(i);
    }

    public void atualizaLista(){
        barbeariasNomes = new ArrayList<>();
        for(int i = 0; i < barbearias.size();i++){
            barbeariasNomes.add(barbearias.get(i).getNome());
        }
        if(barbearias.size() > 0){
            ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, barbeariasNomes);
            lista.setAdapter(arrayAdapter);
        }
    }

    public void acessarBarbearia(String id){
        Intent i = new Intent(BarbeiroGerenciaActivity.this, BarbeariaGerenciaActivity.class);
        i.putExtra("idBarbearia", id);
        startActivity(i);
        finish();
    }
}