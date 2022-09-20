package com.example.barbershapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.barbershapp.classes.Barbearia;
import com.example.barbershapp.classes.Barbeiro;
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

public class BarbeariaGerenciaActivity extends AppCompatActivity {

    TextView txtViewNome;
    TextView txtViewEndereco;
    TextView txtViewContato;
    TextView txtViewHorario;
    TextView txtViewFormasPagamento;
    String idBarbearia;
    Barbearia barbearia;
    ListView listaBarb;
    EditText edtTxtNomeBarbeiro;
    TextView txtBarbeiroSelecionado;

    Button btnAdicionarBarbeiro;
    Button btnEditarBarbearia;
    Button btnRemoverBarbearia;
    Button btnRemoverBarbeiro;
    Button btnTrabalhar;
    Button btnSairBarbearia;

    private FirebaseAuth mAuth;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();
    ArrayList<String> barbeiros;
    ArrayList<String> barbeirosNomes;
    String barbeiroSelecionado = null;

    boolean eoDono = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_barbearia_gerencia);

        btnAdicionarBarbeiro = findViewById(R.id.btnAdicionarBarbeiro);
        btnRemoverBarbearia = findViewById(R.id.btnRemoveBarbearia);
        btnEditarBarbearia = findViewById(R.id.btnEditaBarbearia);
        btnRemoverBarbeiro = findViewById(R.id.btnRemoverBarbeiro);
        btnTrabalhar = findViewById(R.id.btnTrabalhar);
        btnSairBarbearia = findViewById(R.id.btnSairBarbearia);

        idBarbearia = getIntent().getExtras().getString("idBarbearia");
        barbeiros = new ArrayList<>();
        barbeirosNomes = new ArrayList<>();
        listaBarb = findViewById(R.id.lvBarbeiros);

        edtTxtNomeBarbeiro = findViewById(R.id.edtTxtNomeBarbeiro2);
        txtBarbeiroSelecionado = findViewById(R.id.txtViewBarbeiroSelecionado2);

        barbearia = new Barbearia("carregando...","");
        barbearia.setEndereco("carregando...");
        barbearia.setContato("carregando...");
        barbearia.setHorarioFucionamento("carregando...");
        barbearia.setFormasPagamento("carregando...");

        mAuth = FirebaseAuth.getInstance();

        txtViewNome = findViewById(R.id.txtViewNome);
        txtViewEndereco = findViewById(R.id.txtViewEndereco);
        txtViewContato = findViewById(R.id.txtViewContato);
        txtViewHorario = findViewById(R.id.txtViewHorario);
        txtViewFormasPagamento = findViewById(R.id.txtViewFormasPagamento);

        myRef.child("barbearias").child(idBarbearia).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                    barbeiros = new ArrayList<>();
                    String idDono = dataSnapshot.child("idDono").getValue(String.class);
                    String nome = dataSnapshot.child("nome").getValue(String.class);
                    String endereco = dataSnapshot.child("endereco").getValue(String.class);
                    String contato = dataSnapshot.child("contato").getValue(String.class);
                    String horario = dataSnapshot.child("horarioFuncionamento").getValue(String.class);
                    String pagamento = dataSnapshot.child("formasPagamento").getValue(String.class);
                    barbearia.setNome(nome);
                    barbearia.setEndereco(endereco);
                    barbearia.setContato(contato);
                    barbearia.setHorarioFucionamento(horario);
                    barbearia.setFormasPagamento(pagamento);
                    txtViewNome.setText("BARBEARIA: " + barbearia.getNome());
                    txtViewEndereco.setText("ENDEREÇO: " + barbearia.getEndereco());
                    txtViewContato.setText("CONTATO: " + barbearia.getContato());
                    txtViewHorario.setText("HORARIO: " + barbearia.getHorarioFuncionamento());
                    txtViewFormasPagamento.setText("FORMAS DE PAGAMENTO: " + barbearia.getFormasPagamento());
                    for(DataSnapshot data: dataSnapshot.child("barbeiros").getChildren()){
                        String idBarb = data.getKey();
                        barbeiros.add(idBarb);
                        if(idBarb.equals(mAuth.getCurrentUser().getUid())){
                            btnTrabalhar.setVisibility(View.VISIBLE);
                            btnSairBarbearia.setVisibility(View.VISIBLE);
                            btnTrabalhar.setEnabled(true);
                            btnSairBarbearia.setEnabled(true);
                        }
                    }
                    atualizaListaBarbeiros();
                    if((mAuth.getCurrentUser().getUid()).equals(idDono)){
                        eoDono = true;
                        liberaBotoesDono();
                    }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });

        listaBarb.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                selecionarBarb(position);
            }
        });
    }

    public void liberaBotoesDono(){
        btnRemoverBarbearia.setVisibility(View.VISIBLE);
        btnEditarBarbearia.setVisibility(View.VISIBLE);
        btnAdicionarBarbeiro.setVisibility(View.VISIBLE);
        edtTxtNomeBarbeiro.setVisibility(View.VISIBLE);
        btnRemoverBarbeiro.setVisibility(View.VISIBLE);
        btnRemoverBarbearia.setEnabled(true);
        btnEditarBarbearia.setEnabled(true);
        btnAdicionarBarbeiro.setEnabled(true);
        edtTxtNomeBarbeiro.setEnabled(true);
        btnRemoverBarbeiro.setEnabled(true);
    }

    public void atualizaListaBarbeiros(){
        myRef.child("usuarios").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                barbeirosNomes = new ArrayList<>();
                for(DataSnapshot data: dataSnapshot.getChildren()) {
                    for (int i = 0; i < barbeiros.size(); i++) {
                        if(data.getKey().equals(barbeiros.get(i))){
                            String nome = dataSnapshot.child(barbeiros.get(i)).child("nome").getValue(String.class);
                            barbeirosNomes.add(nome);
                        }
                    }
                }
                atualizaLista();
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void atualizaLista(){
        ArrayAdapter<String> barbeirosAdapt = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, barbeirosNomes);
        listaBarb.setAdapter(barbeirosAdapt);
    }

    public void selecionarBarb(int position){
        String idBarbeiro = barbeiros.get(position);
        String barbeiro = barbeirosNomes.get(position);
        txtBarbeiroSelecionado.setText("Barbeiro Selecionado: "+barbeiro);
        barbeiroSelecionado = idBarbeiro;
    }

    public void editarBarbearia(View view){
        Intent i = new Intent(BarbeariaGerenciaActivity.this, EditarBarbeariaActivity.class);
        i.putExtra("idBarbearia", idBarbearia);
        startActivity(i);
    }

    public void removerBarbearia(View view){
        myRef.child("barbearias").child(idBarbearia).setValue(null);
        finish();
    }

    public void removerBarbeiro(View view){
        int i = 0;
        myRef.child("barbearias").child(idBarbearia).child("barbeiros").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for(DataSnapshot data: dataSnapshot.getChildren()) {
                    if(data.getKey().equals(barbeiroSelecionado)){
                        data.getRef().removeValue();
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {

            }
        });
    }

    public void trabalhar(View v){
        Intent i = new Intent(BarbeariaGerenciaActivity.this, BarbeiroActivity.class);
        i.putExtra("idBarbearia", idBarbearia);
        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("/trabalhando", 1);
        myRef.child("barbearias").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for(DataSnapshot data: snapshot.getChildren()){
                    for(DataSnapshot data2: data.child("barbeiros").getChildren()){
                        if(data2.getKey().equals(mAuth.getCurrentUser().getUid())){
                            Map<String, Object> childUpdates = new HashMap<>();
                            childUpdates.put("/trabalhando", 0);
                            data2.getRef().updateChildren(childUpdates);
                        }
                    }
                }
                myRef.child("barbearias").child(idBarbearia).child("barbeiros").child(mAuth.getCurrentUser().getUid()).updateChildren(childUpdates);
                startActivity(i);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }

    public void adicionarBarbeiro(View view){
        String emailBarbeiro = String.valueOf(edtTxtNomeBarbeiro.getText());
        if(!TextUtils.isEmpty(emailBarbeiro)){
            myRef.child("usuarios").addValueEventListener(new ValueEventListener() {
                boolean usuarioEncontrado = false;
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    for(DataSnapshot data: dataSnapshot.getChildren()) {
                        if((data.child("email").getValue(String.class)).equals(emailBarbeiro)) {
                            String idUsuario = data.getKey();
                            String tipo = data.child("tipo").getValue(String.class);
                            if (tipo.equals("barbeiro")) {
                                for (int i = 0; i < barbeiros.size(); i++) {
                                    if (idUsuario.equals(barbeiros.get(i))) {
                                        usuarioEncontrado = true;
                                    }
                                }
                                if(usuarioEncontrado){
                                    toastBarbeiroJaCadastrado();
                                }else{
                                    Map<String, Object> childUpdates = new HashMap<>();
                                    childUpdates.put("/"+idUsuario+"/trabalhando", 0);

                                    myRef.child("barbearias").child(idBarbearia).child("barbeiros").updateChildren(childUpdates);
                                    atualizaListaBarbeiros();

                                    usuarioEncontrado = true;
                                }
                            } else {
                                toastUsuarioNaoBarbeiro();
                            }
                        }else{

                        }
                    }
                    if(!usuarioEncontrado){
                        toastUsuarioNaoEncontrado();
                    }
                }

                @Override
                public void onCancelled(DatabaseError error) {
                }
            });
        }else{
            Toast.makeText(this, "Digite o email do Barbeiro", Toast.LENGTH_SHORT).show();
        }
    }
    public void toastUsuarioNaoEncontrado(){
        Toast.makeText(this, "Usuário não encontrado!", Toast.LENGTH_SHORT).show();
    }
    public void toastUsuarioNaoBarbeiro(){
        Toast.makeText(this, "Este usuário não é um barbeiro!", Toast.LENGTH_SHORT).show();
    }
    public void toastBarbeiroJaCadastrado(){
        Toast.makeText(this, "Este barbeiro já está cadastrado nesta barbearia!", Toast.LENGTH_SHORT).show();
    }

    public void sairBarbearia(View view){
        myRef.child("barbearias").child(idBarbearia).child("barbeiros").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for(DataSnapshot data: snapshot.getChildren()){
                    if(data.getKey().equals(mAuth.getCurrentUser().getUid())){
                        data.getRef().setValue(null);
                        finish();
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }
}