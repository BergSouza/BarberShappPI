package com.example.barbershapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthProvider;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class BarbeiroActivity extends AppCompatActivity {
    Spinner spStatus;
    ListView lvUsuariosFila;
    Button btnPularUsuarioFila;
    Button btnIniciarFinalizarCorte;
    TextView txtViewProximoUsuarioFila;
    TextView txtViewTotalFila;

    int statusAtual;

    ArrayList<String> usuariosFilaId;
    ArrayList<String> usuariosFilaNome;

    private FirebaseAuth mAuth;
    DatabaseReference myRef = FirebaseDatabase.getInstance().getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_barbeiro);

        mAuth = FirebaseAuth.getInstance();

        spStatus = findViewById(R.id.spStatus);
        lvUsuariosFila = findViewById(R.id.lvUsuariosFila);
        btnPularUsuarioFila = findViewById(R.id.btnPularUsuarioFila);
        btnIniciarFinalizarCorte = findViewById(R.id.btnIniciarFinalizarCorte);
        txtViewProximoUsuarioFila = findViewById(R.id.txtViewProximoUsuarioFila);
        txtViewTotalFila = findViewById(R.id.txtViewTotalFila);

        usuariosFilaId = new ArrayList<>();
        usuariosFilaNome = new ArrayList<>();

        statusAtual = 0;
        ArrayList<String> arrList = new ArrayList<>();
        arrList.add("Livre");
        arrList.add("Ocupado");
        arrList.add("Esperando");
        arrList.add("Indisponível");
        ArrayAdapter arrAdap = new ArrayAdapter(BarbeiroActivity.this, android.R.layout.simple_list_item_1 ,arrList);
        spStatus.setAdapter(arrAdap);

        spStatus.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                statusAtual = position+1;
                myRef.child("usuarios").child(mAuth.getCurrentUser().getUid()).child("situacao").setValue(statusAtual);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parentView) {
            }

        });

        myRef.child("usuarios").child(mAuth.getCurrentUser().getUid()).child("fila").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                usuariosFilaId = new ArrayList<>();
                for(DataSnapshot data: snapshot.getChildren()){
                    usuariosFilaId.add(data.getValue(String.class));
                }

                buscaNomeUsuarios();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }

    public void buscaNomeUsuarios(){
        myRef.child("usuarios").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                usuariosFilaNome = new ArrayList<>();
                for(DataSnapshot data: snapshot.getChildren()){
                    for(int i = usuariosFilaId.size()-1; i >= 0; i--){
                        if(data.getKey().equals(usuariosFilaId.get(i))){
                            usuariosFilaNome.add(data.child("nome").getValue(String.class));
                        }
                    }
                }
                ArrayAdapter arrAdapt = new ArrayAdapter(BarbeiroActivity.this, android.R.layout.simple_list_item_1, usuariosFilaNome);
                lvUsuariosFila.setAdapter(arrAdapt);
                if(usuariosFilaNome.size() > 0) {
                    txtViewProximoUsuarioFila.setText("Próximo Usuário da Fila: " + usuariosFilaNome.get(0));
                }else{
                    txtViewProximoUsuarioFila.setText("Sem Usuários na Fila!");
                }txtViewTotalFila.setText("FILA: [TOTAL DE PESSOAS: "+(usuariosFilaNome.size())+"]");
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }

    public void pularUsuario(View view){
        removeProximoFila();
    }

    public void iniciarFinalizarCorte(View view){
        myRef.child("usuarios").child(mAuth.getCurrentUser().getUid()).child("situacao").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if(snapshot.getValue(Integer.class).equals(5)){
                    btnIniciarFinalizarCorte.setText("INICIAR PRÓXIMO");
                    btnPularUsuarioFila.setEnabled(true);
                    removeProximoFila();
                    snapshot.getRef().setValue(1);
                }else{
                    snapshot.getRef().setValue(5);
                    btnPularUsuarioFila.setEnabled(false);
                    btnIniciarFinalizarCorte.setText("FINALIZAR ATUAL");
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }

    public void removeProximoFila(){
        myRef.child("usuarios").child(mAuth.getCurrentUser().getUid()).child("fila").child("0").setValue(null);
        organizaFila();
    }

    public void organizaFila(){
        myRef.child("usuarios").child(mAuth.getCurrentUser().getUid()).addListenerForSingleValueEvent(new ValueEventListener() {
            int keyAtual = 0;
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for(DataSnapshot data: dataSnapshot.child("fila").getChildren()){
                    if(Integer.parseInt(data.getKey()) != keyAtual){
                        Map<String, Object> childUpdates = new HashMap<>();
                        childUpdates.put("/"+(keyAtual), data.getValue(String.class));
                        myRef.child("usuarios").child(mAuth.getCurrentUser().getUid()).child("fila").updateChildren(childUpdates).addOnCompleteListener(new OnCompleteListener<Void>() {
                            @Override
                            public void onComplete(@NonNull Task<Void> task) {
                                data.getRef().setValue(null);
                            }
                        });
                    }
                    keyAtual++;
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }
}