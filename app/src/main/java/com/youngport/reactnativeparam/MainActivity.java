package com.youngport.reactnativeparam;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    public Button helloReact;
    public Button hello_react2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        helloReact=(Button)findViewById(R.id.hello_react);
        hello_react2=(Button)findViewById(R.id.hello_react2);
        helloReact.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(MainActivity.this,HelloReactActivity.class);
                intent.putExtra("data","HelloJack");
                startActivity(intent);
            }
        });
        hello_react2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MyApplication.exampleReactNativePackage.toastExample.nativeCallRn();
            }
        });
    }

}
