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
             text4:'DeviceEventEmitter',
             text5:'getValue',
             data:'no_data',
        }
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('EventName', function  (msg) {
            console.log(msg);
            let rest=NativeModules.ToastForAndroid.MESSAGE;
            ToastAndroid.show("DeviceEventEmitter收到消息:" + "\n" + rest, ToastAndroid.SHORT)
        });
        NativeModules.ToastForAndroid.getDataFromIntent((result)=>{
            this.setState({data:result});
        });
    }

   render() {
     return (
          <View style={styles.container}>
           <Text>{this.state.data}</Text>
           <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                 <Text style={styles.hello}>{this.state.text1}</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={this._onPressButton2.bind(this)}>
                 <Text style={styles.hello}>{this.state.text2}</Text>
            </TouchableOpacity>
           <TouchableOpacity onPress={this._onPressButton3.bind(this)}>
                 <Text style={styles.hello}>{this.state.text3}</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={this._onPressButton4.bind(this)}>
                 <Text style={styles.hello}>{this.state.text4}</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={this._onPressButton5.bind(this)}>
                 <Text style={styles.hello}>{this.state.text5}</Text>
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

    _onPressButton4(){
        NativeModules.ToastForAndroid.sendEvent();
    }

    _onPressButton5(){
         ToastAndroid.show(NativeModules.ToastForAndroid.MESSAGE, ToastAndroid.SHORT)
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
