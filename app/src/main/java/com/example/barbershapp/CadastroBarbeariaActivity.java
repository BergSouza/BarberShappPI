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
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class CadastroBarbeariaActivity extends AppCompatActivity implements OnMapReadyCallback {

    EditText edtTxtCNome;
    EditText edtTxtCEndereco;
    EditText edtTxtCContato;
    EditText edtTxtCHorario;
    EditText edtTxtCPagamento;

    double latBarbearia = 0;
    double lngBarbearia = 0;

    private GoogleMap mMap;

    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cadastro_barbearia);

        mAuth = FirebaseAuth.getInstance();


        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        edtTxtCNome = findViewById(R.id.edtTxtCNome);
        edtTxtCEndereco = findViewById(R.id.edtTxtCEndereco);
        edtTxtCContato = findViewById(R.id.edtTxtCContato);
        edtTxtCHorario = findViewById(R.id.edtTxtCHorario);
        edtTxtCPagamento = findViewById(R.id.edtTxtCPagamentos);

    }

    public void cadastrarBarbearia(View v){
        boolean cadastroLiberado = true;
        Barbearia barbearia = new Barbearia(String.valueOf(edtTxtCNome.getText()),mAuth.getCurrentUser().getUid());
        barbearia.setEndereco(String.valueOf(edtTxtCEndereco.getText()));
        barbearia.setContato(String.valueOf(edtTxtCContato.getText()));
        barbearia.setHorarioFucionamento(String.valueOf(edtTxtCHorario.getText()));
        barbearia.setFormasPagamento(String.valueOf(edtTxtCPagamento.getText()));
        barbearia.setLatLng(latBarbearia,lngBarbearia);
        if(TextUtils.isEmpty(barbearia.getNome()) ||
                TextUtils.isEmpty(barbearia.getEndereco()) ||
                TextUtils.isEmpty(barbearia.getHorarioFuncionamento()) ||
                TextUtils.isEmpty(barbearia.getFormasPagamento())
        ){
            cadastroLiberado = false;
        }
        if(cadastroLiberado){
            barbearia.salva();
            finish();
        }else{
            Toast.makeText(this, "Preencha os Campos obrigatórios!", Toast.LENGTH_SHORT).show();
        }

    }

    @Override
    public void onMapReady(@NonNull GoogleMap googleMap) {
        LatLng quixada = new LatLng(-4.96, -39.01);
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(quixada));

        googleMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {
            @Override
            public void onMapClick(@NonNull LatLng latLng) {
                googleMap.clear();

                googleMap.addMarker(new MarkerOptions()
                        .position(latLng)
                        .title("Local da Barbearia"));
                latBarbearia = latLng.latitude;
                lngBarbearia = latLng.longitude;
            }
        });
    }
}