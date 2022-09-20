package com.example.barbershapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.barbershapp.classes.Barbearia;
import com.example.barbershapp.classes.Usuario;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class SelecionarBarbeariaAcitivity extends AppCompatActivity  implements OnMapReadyCallback {

    ListView lista;

    private FirebaseAuth mAuth;

    TextView txtViewDebug;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();

    ArrayList<Barbearia> barbearias;

    GoogleMap mapa;

    ArrayList<String> barbeariasNomes;

    private String emailUsuario;
    Usuario usuarioLogado;

    ArrayList<LatLng> latLngBarbearias;

    Button btnVirarBarbeiro;
    Button btnGerenciarBarbeiro;
    Button btnAcessarBarbearia;
    ProgressBar pBarCarregaBarbearias;

    int positionBarbeariaSelecionada;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_selecionar_barbearia_acitivity);

        latLngBarbearias = new ArrayList<>();

        btnAcessarBarbearia = findViewById(R.id.btnAcessarBarbearia);

        btnVirarBarbeiro = (Button) findViewById(R.id.btnVirarBarbeiro);
        btnGerenciarBarbeiro = (Button) findViewById(R.id.btnGerenciarBarbeiro);
        pBarCarregaBarbearias = (ProgressBar) findViewById(R.id.pBarCarregandoBarbearias);

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        mAuth = FirebaseAuth.getInstance();
        emailUsuario = mAuth.getCurrentUser().getEmail();

        myRef.child("usuarios").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for(DataSnapshot data: dataSnapshot.getChildren()){
                    Usuario usuAux;
                    usuAux = new Usuario(data.child("nome").getValue(String.class), data.child("usuario").getValue(String.class),data.child("email").getValue(String.class),(String) data.child("senha").getValue(),data.child("tipo").getValue(String.class));
                    if(usuAux.getEmail().equals(emailUsuario)){
                        usuarioLogado = usuAux;
                    }
                }

                if(usuarioLogado.getTipo().equals("usuario")){
                    btnVirarBarbeiro.setVisibility(View.VISIBLE);
                    btnVirarBarbeiro.setEnabled(true);
                }
                if(usuarioLogado.getTipo().equals("barbeiro")){
                    btnGerenciarBarbeiro.setVisibility(View.VISIBLE);
                    btnGerenciarBarbeiro.setEnabled(true);
                }

            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });

        lista = findViewById(R.id.LvBarbearias);

        barbearias = new ArrayList<>();
        barbeariasNomes = new ArrayList<>();

        lista.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                positionBarbeariaSelecionada = position;
                mostrarBarbeariaMapa(position);
            }
        });

        myRef.child("barbearias").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                barbearias = new ArrayList<>();
                barbeariasNomes = new ArrayList<>();
                pBarCarregaBarbearias.setVisibility(View.VISIBLE);
                for(DataSnapshot data: dataSnapshot.getChildren()){
                    Barbearia barbAux = new Barbearia(data.child("nome").getValue(String.class),data.child("idDono").getValue(String.class));
                    barbAux.setId(data.child("id").getValue(String.class));
                    barbearias.add(barbAux);
                }

                atualizaLista();

            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void mostrarBarbeariaMapa(int position){
        btnAcessarBarbearia.setVisibility(View.VISIBLE);
        btnAcessarBarbearia.setEnabled(true);
        btnAcessarBarbearia.setText("IR PARA "+barbeariasNomes.get(position));
        mapa.moveCamera(CameraUpdateFactory.newLatLng(latLngBarbearias.get(position)));
    }

    public void acessarBarbeariaSelecionada(View view){
        acessarBarbearia(barbearias.get(positionBarbeariaSelecionada).getId());
    }

    public void atualizaLista(){
        for(int i = 0; i < barbearias.size();i++){
            barbeariasNomes.add(barbearias.get(i).getNome());
        }
        if(barbearias.size() > 0){
            ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, barbeariasNomes);
            lista.setAdapter(arrayAdapter);
        }
        pBarCarregaBarbearias.setVisibility(View.INVISIBLE);
    }

    public void irParaVirarBarbeiro(View v){
        Intent i = new Intent (SelecionarBarbeariaAcitivity.this, VirarBarbeiroActivity.class);
        startActivity(i);
    }

    public void irParaTelaBarbeiro(View V){
        Intent i = new Intent(SelecionarBarbeariaAcitivity.this, BarbeiroGerenciaActivity.class);
        startActivity(i);
    }

    public void acessarBarbearia(String id){
        Intent i = new Intent(SelecionarBarbeariaAcitivity.this, InfoBarbeariaActivity.class);
        i.putExtra("idBarbearia", id);
        startActivity(i);
    }

    @Override
    public void onMapReady(@NonNull GoogleMap googleMap) {
        mapa = googleMap;
        LatLng quixada = new LatLng(-4.96, -39.01);
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(quixada));
        myRef.child("barbearias").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for(DataSnapshot data: snapshot.getChildren()){
                    String nome = data.child("nome").getValue(String.class);
                    LatLng posicao = new LatLng(data.child("lat").getValue(Double.class), data.child("lng").getValue(Double.class));
                    latLngBarbearias.add(posicao);
                    googleMap.addMarker(new MarkerOptions()
                    .title(nome)
                    .position(posicao)
                    );
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }
}