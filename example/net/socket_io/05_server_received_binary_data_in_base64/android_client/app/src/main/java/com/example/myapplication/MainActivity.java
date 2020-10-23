package com.example.myapplication;

import android.os.Build;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Environment;
import android.util.Log;
import android.view.View;

import android.view.Menu;
import android.view.MenuItem;


import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;

import java.nio.Buffer;
import java.util.Arrays;
// import java.util.Base64;
import android.util.Base64;
import java.util.stream.Stream;

public class MainActivity extends AppCompatActivity {
    public static final String TAG = "MainActivity";
    private Socket mSocket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        try {
            mSocket = IO.socket("http://192.168.26.109:3000");
            mSocket.on(Socket.EVENT_CONNECT, onConnect);
            mSocket.connect();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private Emitter.Listener onConnect = new Emitter.Listener() {
        //After getting a Socket.EVENT_CONNECT which indicate socket has been connected to server,
        //send userName and roomName so that they can join the room.
        // mSocket.emit("message", "test");
        @Override
        public void call(Object... args) {
            Log.d("success", "EVENT_CONNECT");
            mSocket.emit("message", "hello, I'm from Android");
            mSocket.emit("message","1");
            mSocket.emit("message","2");
            mSocket.emit("message","3");

            sendWaveFile();

        }
    };

    private static String byteArray2String(byte byteString[]){
        String strMessage = "";
        for (int i = 0; i < byteString.length; i++) {
            strMessage = strMessage + Integer.toString(byteString[i] & 0xFF, 16);
        }
        return strMessage;
    }


    @RequiresApi(api = Build.VERSION_CODES.O)
    private void sendWaveFile() {
        File filePath = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
        File[] lstFile = filePath.listFiles();

        final int intBufferSize = 10;
        byte[] byteBuffer = new byte[intBufferSize];

        try {
            String strMessage = "Start transfer binary: " + lstFile[0];
            Log.d(TAG, strMessage);
            mSocket.emit("message",strMessage);
            InputStream inputStream = new FileInputStream(lstFile[0]);
            int intByteRead;
            int intTotalByteSend = 0;
            while ((intByteRead = inputStream.read(byteBuffer)) != -1) {

//                // Debug
//                for (int i = 0; i< intBufferSize; i++){
//                    byteBuffer[i] = (byte) i;
//                }
//                // End

                String strData_base64;
                if (intByteRead == intBufferSize) {
                    Log.d(TAG, "Send: binary length = " + byteBuffer.length);
                    strData_base64 = Base64.encodeToString(byteBuffer, Base64.DEFAULT);
                    Log.d(TAG, "Send: strData_base64 = " + strData_base64);
                    mSocket.emit("binary_data", strData_base64);
                } else {
                    byte[] byteBuffer2 = Arrays.copyOfRange(byteBuffer, 0, intByteRead);
                    strData_base64 = Base64.encodeToString(byteBuffer2, Base64.DEFAULT);
                    Log.d(TAG, "Send: strData_base64 = " + strData_base64);
                    mSocket.emit("binary_data", strData_base64);
                }
                Log.d(TAG, "strData_base64 = " + strData_base64);
                intTotalByteSend = intTotalByteSend + intByteRead;
            }

            mSocket.emit("message", "End");

            strMessage = "End Android transmission (binary):" +
                    "\n\t File length = " + lstFile[0].length() +
                    "\n\t intTotalByteSend = " + intTotalByteSend;
            Log.d(TAG, strMessage);
            mSocket.emit("message", strMessage);

        } catch (IOException ex) {
            ex.printStackTrace();
        }


    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}