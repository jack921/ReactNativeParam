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
             text:'HelloJacks',
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
                 <Text style={styles.hello}>{this.state.text}</Text>
           </TouchableOpacity>
          </View>
        )
   }

   _onPressButton(){
        NativeModules.ToastForAndroid.show(1000);
      // NativeModules.ToastForAndroid.testAndroidCallbackMethod("HelloJack",(result)=>{
      //     this.setState({text:result});
      // });
      //   NativeModules.ToastForAndroid.textAndroidPromiseMethod("abcx").then((result)=>{
      //       this.setState({text:result});
      //   }).catch((error)=>{
      //       this.setState({text:'error'});
      //   })
   }

}

   var styles = StyleSheet.create({
     container: {
        flex: 1,
        justifyContent: 'center',
      },
      hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
    });

AppRegistry.registerComponent('HelloWorlds', () => HelloWorld);
