package com.example.barbershapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;

import com.example.barbershapp.classes.Barbeiro;
import com.example.barbershapp.classes.Usuario;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class FilaBarbeariaActivity extends AppCompatActivity {

    ListView listaBarb;
    TextView txtViewBarbeiroSelecionado;
    TextView txtViewPessoasNaFila;
    TextView txtPosicaoFila;
    Button btnFila;
    String barbeariaSelecionada;
    int posicaoBarbeiroSelecionado;
    String idBarbeiroSelecionado;
    ArrayList<Barbeiro> barbeiros;
    ArrayList<String> barbeirosIds;

    int totalPessoasFila;
    int posicaoFila;

    ArrayList<String> barbeirosNomes;
    ArrayList<Integer> barbeirosSituacao;
    ArrayList<String> showInfoBarbeiros;

    boolean contEstaNaFila;
    boolean corteIniciado;

    int keyUsuario;

    private FirebaseAuth mAuth;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fila_barbearia);
        mAuth = FirebaseAuth.getInstance();

        barbeirosNomes = new ArrayList<>();
        barbeirosSituacao = new ArrayList<>();
        showInfoBarbeiros = new ArrayList<>();

        btnFila = findViewById(R.id.btnFila);
        btnFila.setVisibility(View.INVISIBLE);
        btnFila.setEnabled(false);

        txtPosicaoFila = findViewById(R.id.txtViewPosicaoFila);
        listaBarb = findViewById(R.id.lvBarbeiros);
        barbeariaSelecionada = getIntent().getExtras().getString("idBarbearia");
        barbeiros = new ArrayList<>();
        barbeirosIds = new ArrayList<>();

        barbeirosNomes = new ArrayList<>();
        barbeirosSituacao = new ArrayList<>();
        showInfoBarbeiros = new ArrayList<>();

        totalPessoasFila = 0;
        corteIniciado = false;
        contEstaNaFila = false;
        idBarbeiroSelecionado = null;

        myRef.child("barbearias").child(barbeariaSelecionada).child("barbeiros").addValueEventListener(new ValueEventListener() {

            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                barbeirosIds = new ArrayList<>();

                for(DataSnapshot data: dataSnapshot.getChildren()){
                    try {
                        if (data.child("trabalhando").getValue(Integer.class) == 1) {
                            barbeirosIds.add(data.getKey());
                        }
                    }catch (Exception e){

                    }
                }

                buscaInformacoesBarbeiros();
            }

            @Override
            public void onCancelled(DatabaseError error) {

            }
        });

        listaBarb.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                txtViewBarbeiroSelecionado.setText("BARBEIRO SELECIONADO: "+ barbeirosNomes.get(position));
                //txtViewPessoasNaFila.setText("PESSOAS NA FILA: "+daobarbeiro.getTotalFila(barbeiros.get(position).getId()));
                posicaoBarbeiroSelecionado = position;
                idBarbeiroSelecionado = barbeirosIds.get(position);
                btnFila.setVisibility(View.VISIBLE);
                btnFila.setEnabled(true);

                verificaSeEstaNaFila();
            }
        });
    }

    public void buscaInformacoesBarbeiros(){
        myRef.child("usuarios").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                barbeiros = new ArrayList<>();
                barbeirosSituacao = new ArrayList<>();
                barbeirosNomes = new ArrayList<>();
                for(DataSnapshot data: dataSnapshot.getChildren()){
                    for(int i = 0; i < barbeirosIds.size(); i++){
                        if(barbeirosIds.get(i).equals((data.getKey()))){
                            Barbeiro usuAux;
                            usuAux = new Barbeiro(data.child("nome").getValue(String.class), data.child("usuario").getValue(String.class),data.child("email").getValue(String.class),(String) data.child("senha").getValue());
                            usuAux.setSituacao(data.child("situacao").getValue(Integer.class));
                            for(DataSnapshot data2: data.child("fila").getChildren()){
                                String usuarioFila = data2.getValue(String.class);
                                usuAux.addUsuarioFila(usuarioFila);
                            }
                            barbeiros.add(usuAux);
                        }
                    }
                }
                atualizaBarbeiros();
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void atualizaBarbeiros(){
        showInfoBarbeiros = new ArrayList<>();
        txtViewBarbeiroSelecionado = findViewById(R.id.txtViewBarbeiroSelecionado);
        txtViewPessoasNaFila = findViewById(R.id.txtViewPessoasFila);
        btnFila = findViewById(R.id.btnFila);

        for(int i = barbeiros.size()-1; i >= 0;i--){
            barbeirosNomes.add(barbeiros.get(i).getNome());
            barbeirosSituacao.add(barbeiros.get(i).getSituacao());
        }
        for(int i = barbeiros.size()-1; i >= 0;i--){
            String situacao = null;
            if(barbeiros.get(i).getSituacao() == 1){
                situacao = "Livre";
            }
            if(barbeiros.get(i).getSituacao() == 2){
                situacao = "Ocupado";
            }
            if(barbeiros.get(i).getSituacao() == 3){
                situacao = "Esperando";
            }
            if(barbeiros.get(i).getSituacao() == 4){
                situacao = "Indisponível";
            }
            if(barbeiros.get(i).getSituacao() == 5){
                situacao = "Com um cliente";
            }
            showInfoBarbeiros.add(barbeiros.get(i).getNome()+" ["+situacao+"]");
        }
        ArrayAdapter<String> barbeirosAdapt = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, showInfoBarbeiros);
        listaBarb.setAdapter(barbeirosAdapt);

    }

    public void BotaoFila(View v){
        organizaFila();
    }

    public void organizaFila(){
        myRef.child("usuarios").child(idBarbeiroSelecionado).addListenerForSingleValueEvent(new ValueEventListener() {
            int keyAtual = 0;
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for(DataSnapshot data: dataSnapshot.child("fila").getChildren()){
                    if(Integer.parseInt(data.getKey()) != keyAtual){
                        Map<String, Object> childUpdates = new HashMap<>();
                        childUpdates.put("/"+(keyAtual), data.getValue(String.class));
                        myRef.child("usuarios").child(idBarbeiroSelecionado).child("fila").updateChildren(childUpdates).addOnCompleteListener(new OnCompleteListener<Void>() {
                            @Override
                            public void onComplete(@NonNull Task<Void> task) {
                                data.getRef().setValue(null);
                            }
                        });
                    }
                    keyAtual++;
                }

                if(contEstaNaFila){
                    sairDaFila();
                }else{
                    entrarNaFila(keyAtual);
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void verificaSeEstaNaFila(){
        myRef.child("usuarios").child(idBarbeiroSelecionado).addValueEventListener(new ValueEventListener() {
            int keyAtual = 0;
            Map<String, Object> childUpdates = new HashMap<>();
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                totalPessoasFila = 0;
                for(DataSnapshot data: dataSnapshot.child("fila").getChildren()){
                    totalPessoasFila++;
                    txtViewPessoasNaFila.setText("PESSOAS NA FILA: "+totalPessoasFila);
                    if(data.getValue(String.class).equals(mAuth.getCurrentUser().getUid())){
                        btnFila.setText("SAIR DA FILA");
                        posicaoFila = totalPessoasFila;
                        txtPosicaoFila.setText("VOCÊ ESTÁ NA FILA! POSIÇÃO: "+posicaoFila);
                        contEstaNaFila = true;
                        keyUsuario = Integer.parseInt(data.getKey());
                    }else{
                        btnFila.setText("ENTRAR NA FILA");
                        txtPosicaoFila.setText("VOCÊ NÃO ESTÁ NA FILA!");
                        contEstaNaFila = false;
                    }
                }
                if(totalPessoasFila == 0){
                    btnFila.setText("ENTRAR NA FILA");
                    txtPosicaoFila.setText("VOCÊ NÃO ESTÁ NA FILA!");
                    contEstaNaFila = false;
                }
                if(totalPessoasFila == 1 && contEstaNaFila && !corteIniciado){
                    if(dataSnapshot.child("situacao").getValue(Integer.class) == 5){
                        corteIniciado = true;
                        btnFila.setEnabled(false);
                        btnFila.setText("TRABALHO INICIADO. POR FAVOR, ESPERE.");
                    }
                }
                if(!contEstaNaFila && corteIniciado){
                    corteIniciado = false;
                    Intent i = new Intent (FilaBarbeariaActivity.this, AvaliacaoActivity.class);
                    i.putExtra("idBarbearia", barbeariaSelecionada);
                    startActivity(i);
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }



    public void entrarNaFila(int posicao){
        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("/"+(posicao), mAuth.getCurrentUser().getUid());

        myRef.child("usuarios").child(idBarbeiroSelecionado).child("fila").updateChildren(childUpdates);
    }

    public void sairDaFila(){
        myRef.child("usuarios").child(idBarbeiroSelecionado).child("fila").child(Integer.toString(keyUsuario)).setValue(null);
    }
}