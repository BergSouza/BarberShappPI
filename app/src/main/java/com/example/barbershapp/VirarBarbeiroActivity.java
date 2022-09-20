package com.example.barbershapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.example.barbershapp.classes.Barbeiro;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;


public class VirarBarbeiroActivity extends AppCompatActivity {
    private FirebaseAuth mAuth;
    String idUsuario;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_virar_barbeiro);
        mAuth = FirebaseAuth.getInstance();
        idUsuario = mAuth.getCurrentUser().getUid();
    }

    public void tornarSeBarbeiro(View v){
        myRef.child("usuarios").child(idUsuario).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Map<String, Object> childUpdates = new HashMap<>();
                childUpdates.put("/tipo/", "barbeiro");
                childUpdates.put("/situacao/", 1);

                myRef.child("usuarios").child(idUsuario).updateChildren(childUpdates);
                finish();
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }
}