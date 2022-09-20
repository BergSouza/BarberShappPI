package com.example.barbershapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

public class AvaliacaoActivity extends AppCompatActivity {

    Spinner spNota;
    EditText edtTextComentario;

    String idBarbearia;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();

    int notaPosition = 1;

    Calendar calendar;

    FirebaseAuth mAuth;

    ArrayList<String> notas = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_avaliacao);

        spNota = findViewById(R.id.spNota);
        edtTextComentario = findViewById(R.id.edtTxtComentario);

        idBarbearia = getIntent().getExtras().getString("idBarbearia");

        calendar = Calendar.getInstance();

        notas.add("1");
        notas.add("2");
        notas.add("3");
        notas.add("4");
        notas.add("5");
        notas.add("6");
        notas.add("7");
        notas.add("8");
        notas.add("9");
        notas.add("10");
        ArrayAdapter<String> arrAdapt = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, notas);
        spNota.setAdapter(arrAdapt);
        mAuth = FirebaseAuth.getInstance();

        spNota.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                notaPosition = Integer.parseInt(notas.get(position));
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    public void avalia(View view){
        if(!TextUtils.isEmpty(edtTextComentario.getText())){
            Map<String, Object> childUpdates = new HashMap<>();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
            String data = dateFormat.format(calendar.getTime());
            int hora = calendar.get(Calendar.HOUR_OF_DAY);
            int min = calendar.get(Calendar.MINUTE);
            childUpdates.put("/avaliacoes"+"/"+data+"-"+hora+":"+min+"/nota", notas.get(notaPosition-1));
            childUpdates.put("/avaliacoes"+"/"+data+"-"+hora+":"+min+"/comentario", String.valueOf(edtTextComentario.getText()));
            myRef.child("barbearias").child(idBarbearia).updateChildren(childUpdates).addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
                    finish();
                }
            });
        }else{
            Toast.makeText(this, "ESCREVA UM COMENTÁRIO!", Toast.LENGTH_SHORT).show();
        }
    }

    public void finaliza(View view){
        finish();
    }
}