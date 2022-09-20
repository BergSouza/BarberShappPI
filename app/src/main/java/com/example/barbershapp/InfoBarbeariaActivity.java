package com.example.barbershapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.example.barbershapp.classes.Barbearia;
import com.example.barbershapp.classes.Usuario;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class InfoBarbeariaActivity extends AppCompatActivity {

    TextView txtViewNome;
    TextView txtViewEndereco;
    TextView txtViewContato;
    TextView txtViewHorario;
    TextView txtViewFormasPagamento;
    TextView txtViewAvaliacoes;
    String idBarbearia;
    Barbearia barbearia;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info_barbearia);

        idBarbearia = getIntent().getExtras().getString("idBarbearia");

        barbearia = new Barbearia("carregando...","");
        barbearia.setEndereco("carregando...");
        barbearia.setContato("carregando...");
        barbearia.setHorarioFucionamento("carregando...");
        barbearia.setFormasPagamento("carregando...");

        txtViewNome = findViewById(R.id.txtViewNome);
        txtViewEndereco = findViewById(R.id.txtViewEndereco);
        txtViewContato = findViewById(R.id.txtViewContato);
        txtViewHorario = findViewById(R.id.txtViewHorario);
        txtViewFormasPagamento = findViewById(R.id.txtViewFormasPagamento);
        txtViewAvaliacoes = findViewById(R.id.txtViewAvaliacoes);
        ArrayList<String> arrAvaliacoes = new ArrayList<>();
        myRef.child("barbearias").child(idBarbearia).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
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

                try {
                    for (DataSnapshot data : dataSnapshot.child("avaliacoes").getChildren()) {
                        String dataAv[] = data.getKey().split("-");
                        String avaliacoes = "";
                        avaliacoes += dataAv[0]+"/"+dataAv[1]+"/"+dataAv[2]+"\n";
                        avaliacoes += "NOTA: " + data.child("nota").getValue(String.class)+"\n";
                        avaliacoes += "COMENTÁRIO: "+data.child("comentario").getValue(String.class)+"\n";
                        avaliacoes += "=============================\n";
                        arrAvaliacoes.add(avaliacoes);
                    }
                }catch(Exception e){
                    txtViewAvaliacoes.setText("ESTA BARBEARIA AINDA NÃO POSSUI NENHUMA AVALIACAO!");
                }
                txtViewAvaliacoes.setText("AVALIAÇÕES: \n");
                for(int i = arrAvaliacoes.size()-1; i >= 0;i--){
                    txtViewAvaliacoes.setText(txtViewAvaliacoes.getText()+arrAvaliacoes.get(i));
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
            }
        });
    }

    public void entrarNaFila(View view){
        Intent i = new Intent(InfoBarbeariaActivity.this, FilaBarbeariaActivity.class);
        i.putExtra("idBarbearia", idBarbearia);
        startActivity(i);
    }
}