/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import QrStore from '../../stores/QrStore';
import styles from '../../theme/styles';
import translations from '../../configs/translations';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QrCodeScreen = observer(() => {
  const navigation = useNavigation();
  const scannerRef = useRef(null);

  const onSuccess = e => {
    QrStore.setToken(e.data);
    QrStore.readQr(
      () => {
        navigation.navigate("LastEntriesScreen");
      },
      (text) => {
        Alert.alert(
          '',
          text,
          [
            {
              text: 'OK',
              onPress: () => {
                scannerRef.current?.reactivate();
              }
            },
          ],
          { cancelable: false },
        );
      }
    );
  };

  useEffect(() => {
    scannerRef.current?.reactivate();
  }, []);

  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      reactivateTimeout={3000}
      ref={scannerRef}
      flashMode={RNCamera.Constants.FlashMode.auto}
    />
  );
});

export default QrCodeScreen;