package com.youngport.reactnativeparam;

import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018/4/25.
 */

public class ToastExample extends ReactContextBaseJavaModule{
    private static final String LONG_TIME = "LONG";
    private static final String SHORT_TIME = "SHORT";
    private static final String MESSAGE = "MESSAGE";

    public ToastExample(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastForAndroid";
    }

    @Override
    public Map<String, Object> getConstants() {
        //让js那边能够使用这些常量
        Map<String,Object> constants = new HashMap<>();
        constants.put(LONG_TIME, Toast.LENGTH_LONG);
        constants.put(SHORT_TIME,Toast.LENGTH_SHORT);
        constants.put(MESSAGE,"getConstants");
        return constants;
    }

    @ReactMethod
    public void show(int duration){
        Toast.makeText(getReactApplicationContext(),"message:"+duration,duration).show();
    }

    @ReactMethod
    public void sendEvent(){
        onScanningResult();
    }

    @ReactMethod
    public void testAndroidCallbackMethod(String msg, Callback callback){
        Toast.makeText(getReactApplicationContext(),msg,Toast.LENGTH_LONG).show();
        callback.invoke("abc");
    }

    @ReactMethod
    public void textAndroidPromiseMethod(String msg, Promise promise){
        Toast.makeText(getReactApplicationContext(),msg,Toast.LENGTH_SHORT).show();
        String result="谢汉杰";
        promise.resolve(result);
    }

    public void onScanningResult(){
        WritableMap params = Arguments.createMap();
        params.putString("key", "myData");
        sendEvent(getReactApplicationContext(),"EventName",params);
    }

    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }



}
