package com.example.barbershapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class MainActivity extends AppCompatActivity {

    EditText edtTxtUsuarioEmail;
    EditText edtTxtSenha;


    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mAuth = FirebaseAuth.getInstance();

        edtTxtUsuarioEmail = findViewById(R.id.edtTxtUsuarioEmail);
        edtTxtSenha = findViewById(R.id.edtTxtSenha);

    }

    public void irParaCadastro(View v){
        Intent i = new Intent(MainActivity.this, CadastroActivity.class);
        startActivity(i);
    }

    public void realizarLogin(View v){
        String usuarioEmail = String.valueOf(edtTxtUsuarioEmail.getText());
        String senha = String.valueOf(edtTxtSenha.getText());
        if(TextUtils.isEmpty(usuarioEmail) || TextUtils.isEmpty(senha)){
            Toast.makeText(this, "DIGITE O LOGIN!", Toast.LENGTH_SHORT).show();
        }else {
            mAuth.signInWithEmailAndPassword(usuarioEmail, senha)
                    .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if (task.isSuccessful()) {
                                Log.d("OH", "signInWithEmail:success");
                                FirebaseUser user = mAuth.getCurrentUser();
                                Intent i = new Intent(MainActivity.this, SelecionarBarbeariaAcitivity.class);
                                startActivity(i);
                                mAuth.updateCurrentUser(user);
                            } else {
                                Toast toast = Toast.makeText(MainActivity.this, "Usuario/Email ou Senha Inválido(s)", Toast.LENGTH_SHORT);
                                toast.show();
                            }
                        }
                    });
        }
    }
}