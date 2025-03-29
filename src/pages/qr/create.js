/* eslint-disable */
import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Alert,StyleSheet} from 'react-native';
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import QrStore from '../../stores/QrStore';
// import styles from '../../theme/styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import translations from '../../configs/translations'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg';
import LoginStore from '../../stores/LoginStore';
import Icon from 'react-native-vector-icons/FontAwesome';
@observer
class QrCodeCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "QR",
    headerLayoutPreset: 'center'
  });
  
  componentDidMount() {
    // this.scanner.reactivate();
    QrStore.getQr();
    // console.log('ruenikeler',LoginStore.TurnIds.length);
  }


  render() {
   
    //   return (
    //     <QRCodeScanner
    //     onRead={this.onSuccess}
    //     reactivate={true}
    //     reactivateTimeout={3000}
    //     ref={(node) => { this.scanner = node }}
    //     flashMode={RNCamera.Constants.FlashMode.auto}
        
    //   />
    //   );
//    return (
//     <QRCode
//       value="asdasdasd"
//     />

//    );
if (LoginStore.entry==1) 
{
    return ( 
        <View style={styles.container}> 
            <View style={styles.wrapper}> 
            <CountdownCircleTimer
        isPlaying={QrStore.TimerStart}
        duration={5}
        size={100}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
            // do your stuff here
             QrStore.getQr();
            return { shouldRepeat: true} // repeat animation in 1.5 seconds
          }}
      >
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
               
               
                    <View style={styles.qrCode}> 
                        <QRCode 
                            value={QrStore.QrValue}
                            size={200} 
                            color="black"
                            backgroundColor="white"
                        /> 
                    </View> 
              
            </View> 
        </View> 
    ); 

}
else
{
    return (
        <View style={styles.bannerContainerWrapper}>
          <View style={styles.bannerContainer}>
            <Icon style={styles.bannerIcon} name={"info-circle"} size={22} />
            <Text style={styles.bannerText}>
              {LoginStore.entryMessage}
            </Text>
          </View>
        </View>
      );
}

} 
  }
  const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#eee', 
    }, 
    wrapper: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        maxWidth: 300, 
        backgroundColor: '#fff', 
        borderRadius: 7, 
        padding: 20, 
        shadowColor: 'rgba(0, 0, 0, 0.1)', 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 1, 
        shadowRadius: 30, 
    }, 
    title: { 
        fontSize: 21, 
        fontWeight: '500', 
        marginBottom: 10, 
    }, 
    description: { 
        color: '#575757', 
        fontSize: 16, 
        marginBottom: 20, 
    }, 
    input: { 
        fontSize: 18, 
        padding: 17, 
        borderWidth: 1, 
        borderColor: '#999', 
        borderRadius: 5, 
        marginBottom: 20, 
    }, 
    button: { 
        backgroundColor: '#3498DB', 
        borderRadius: 5, 
        padding: 15, 
        alignItems: 'center', 
    }, 
    buttonText: { 
        color: '#fff', 
        fontSize: 18, 
    }, 
    qrCode: { 
        marginTop: 20, 
        alignItems: 'center', 
    }, 
    bannerContainerWrapper: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      },
      bannerContainer: {
        flexDirection: "row",
        backgroundColor: "gray",
        color: "#ffffff",
        padding: 8,
        borderRadius: 4,
        marginBottom: 10
      },
      bannerIcon: {
        color: "#ffffff",
        paddingRight: 2
      },
      bannerText: {
        color: "#ffffff",
        padding: 2
      },
});
export default withNavigation(QrCodeCreateScreen)