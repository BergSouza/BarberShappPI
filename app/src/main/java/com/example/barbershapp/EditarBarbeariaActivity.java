package com.example.barbershapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.barbershapp.classes.Barbearia;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

public class EditarBarbeariaActivity extends AppCompatActivity implements OnMapReadyCallback {

    EditText edtTxtABNome;
    EditText edtTxtABEndereco;
    EditText edtTxtABContato;
    EditText edtTxtABHorario;
    EditText edtTxtABPagamento;

    private GoogleMap mapa;

    double lat;
    double lng;

    String idBarbearia;

    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference myRef = database.getReference();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_editar_barbearia);
        edtTxtABNome = findViewById(R.id.edtTxtABNome);
        edtTxtABEndereco = findViewById(R.id.edtTxtABEndereco);
        edtTxtABContato = findViewById(R.id.edtTxtABContato);
        edtTxtABHorario = findViewById(R.id.edtTxtABHorario);
        edtTxtABPagamento = findViewById(R.id.edtTxtABPagamentos);

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        idBarbearia = getIntent().getExtras().getString("idBarbearia");

        myRef.child("barbearias").child(idBarbearia).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                String nome = dataSnapshot.child("nome").getValue(String.class);
                String endereco = dataSnapshot.child("endereco").getValue(String.class);
                String contato = dataSnapshot.child("contato").getValue(String.class);
                String horario = dataSnapshot.child("horarioFuncionamento").getValue(String.class);
                String pagamento = dataSnapshot.child("formasPagamento").getValue(String.class);
                lat = dataSnapshot.child("lat").getValue(double.class);
                lng = dataSnapshot.child("lng").getValue(double.class);
                edtTxtABNome.setText(nome);
                edtTxtABEndereco.setText(endereco);
                edtTxtABContato.setText(contato);
                edtTxtABHorario.setText(horario);
                edtTxtABPagamento.setText(pagamento);
                mapa.addMarker(new MarkerOptions().title("LOCAL DA BARBEARIA").position(new LatLng(lat,lng)));
                mapa.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(lat,lng)));
            }
            @Override
            public void onCancelled(DatabaseError error) {

            }
        });
    }

    public void atualizarBarbearia(View view){
        boolean cadastroLiberado = false;
        String nome = String.valueOf(edtTxtABNome.getText());
        String endereco = String.valueOf(edtTxtABEndereco.getText());
        String contato = String.valueOf(edtTxtABContato.getText());
        String horario = String.valueOf(edtTxtABHorario.getText());
        String pagamento = String.valueOf(edtTxtABPagamento.getText());
        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("/nome/", nome);
        childUpdates.put("/endereco/", endereco);
        childUpdates.put("/contato/", contato);
        childUpdates.put("/horarioFuncionamento/", horario);
        childUpdates.put("/formasPagamento/", pagamento);
        childUpdates.put("/lat", lat);
        childUpdates.put("/lng", lng);

        if(TextUtils.isEmpty(nome) ||
                TextUtils.isEmpty(endereco) ||
                TextUtils.isEmpty(horario) ||
                TextUtils.isEmpty(pagamento)
        ){
            cadastroLiberado = false;
        }else{
            cadastroLiberado = true;
        }
        if(cadastroLiberado) {
            myRef.child("barbearias").child(idBarbearia).updateChildren(childUpdates);
            finish();
        }else{
            Toast.makeText(this, "Preencha os Campos obrigatórios!", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onMapReady(@NonNull GoogleMap googleMap) {
        mapa = googleMap;
        LatLng quixada = new LatLng(-4.96, -39.01);
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(quixada));

        mapa.setOnMapClickListener(new GoogleMap.OnMapClickListener() {
            @Override
            public void onMapClick(@NonNull LatLng latLng) {
                mapa.clear();
                mapa.addMarker(new MarkerOptions().title("LOCAL DA BARBEARIA").position(latLng));
                lat = latLng.latitude;
                lng = latLng.longitude;
            }
        });
    }
}