package com.example.barbershapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import com.example.barbershapp.classes.Usuario;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;
import java.util.Map;

public class CadastroActivity extends AppCompatActivity {

    EditText edtTxtUsuario;
    EditText edtTxtNome;
    EditText edtTxtEmail;
    EditText edtTxtSenha;
    CheckBox cBox;

    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cadastro);

        mAuth = FirebaseAuth.getInstance();

    }

    public void irParaLogin(View v){
        finish();
    }

    public void realizarCadastro(View v){
        edtTxtNome = findViewById(R.id.edtTxtNome);
        edtTxtUsuario = findViewById(R.id.edtTxtUsuario);
        edtTxtEmail = findViewById(R.id.edtTxtEmail);
        edtTxtSenha = findViewById(R.id.edtTxtSenhaC);
        cBox = findViewById(R.id.cBoxBarbeiro);
        String nome = String.valueOf(edtTxtNome.getText());
        String usuario = String.valueOf(edtTxtUsuario.getText());
        String email = String.valueOf((edtTxtEmail.getText()));
        String senha = String.valueOf((edtTxtSenha.getText()));
        String tipo = "usuario";

        Usuario newUser = new Usuario(nome,usuario,email,senha,tipo);
        mAuth.createUserWithEmailAndPassword(email, senha)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            FirebaseUser user = mAuth.getCurrentUser();

                            FirebaseDatabase database = FirebaseDatabase.getInstance();
                            DatabaseReference myRef = database.getReference();
                            myRef.child("usuarios").child(user.getUid()).setValue(newUser);
                            if(cBox.isSelected()){
                                Map<String, Object> childUpdates = new HashMap<>();
                                childUpdates.put("/tipo/", "barbeiro");
                                childUpdates.put("/situacao/", 1);
                                myRef.child("usuarios").child(user.getUid()).updateChildren(childUpdates);
                            }

                            Toast toast = Toast.makeText(CadastroActivity.this, "Conta criada com sucesso!", Toast.LENGTH_SHORT);
                            toast.show();
                            finish();
                        } else {
                            Toast.makeText(CadastroActivity.this, "Não foi possível se cadastrar.",
                                    Toast.LENGTH_SHORT).show();
                        }

                    }
                });

    }
}