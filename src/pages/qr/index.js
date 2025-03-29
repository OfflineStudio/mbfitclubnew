/* eslint-disable */
import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Alert} from 'react-native';
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import QrStore from '../../stores/QrStore';
import styles from '../../theme/styles';
 
import translations from '../../configs/translations'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
 
@observer
class QrCodeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "QR",
    headerLayoutPreset: 'center'
  });
  onSuccess = e => {   
    QrStore.setToken(e.data);
    QrStore.readQr(() => {
      this.props.navigation.navigate("LastEntriesScreen");
      
    },
      (text) => {
        Alert.alert(
          '',
          text,
          [
            {text: 'OK', onPress: () => {
              this.scanner.reactivate();
           
            }},
          ],
          { cancelable: false },
        );
      })
  };
  componentDidMount() {
    this.scanner.reactivate();
  }


  render() {
   
      return (
        <QRCodeScanner
        onRead={this.onSuccess}
        reactivate={true}
        reactivateTimeout={3000}
        ref={(node) => { this.scanner = node }}
        flashMode={RNCamera.Constants.FlashMode.auto}
        
      />
      );
   
  }
}
export default withNavigation(QrCodeScreen)