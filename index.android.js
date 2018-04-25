'use strict';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';

export default class HelloWorld extends React.Component {

    constructor(props){
        super(props);
        this.state={
             text1:'ToastForAndroid',
             text2:'testAndroidCallbackMethod',
             text3:'textAndroidPromiseMethod',
        }
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('EventName', function  (msg) {
            console.log(msg);
            let resr=NativeModules.ToastForAndroid.MESSAGE;
            ToastAndroid.show("DeviceEventEmitter收到消息:" + "\n" + resr, ToastAndroid.SHORT)
        });
    }

   render() {
     return (
          <View style={styles.container}>
           <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                 <Text style={styles.hello}>{this.state.text1}</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={this._onPressButton2.bind(this)}>
                 <Text style={styles.hello}>{this.state.text2}</Text>
            </TouchableOpacity>
           <TouchableOpacity onPress={this._onPressButton3.bind(this)}>
                 <Text style={styles.hello}>{this.state.text3}</Text>
           </TouchableOpacity>
          </View>
        )
   }

   _onPressButton(){
        NativeModules.ToastForAndroid.show(1000);
   }

    _onPressButton2(){
        NativeModules.ToastForAndroid.testAndroidCallbackMethod("HelloJack",(result)=>{
           this.setState({text:result});
       });
    }

    _onPressButton3(){
       NativeModules.ToastForAndroid.textAndroidPromiseMethod("abcx").then((result)=>{
                 this.setState({text3:result});
             }).catch((error)=>{
                 this.setState({text:'error'});
             })
    }

}

   var styles = StyleSheet.create({
     container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      },
      hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
    });

AppRegistry.registerComponent('HelloWorlds', () => HelloWorld);
