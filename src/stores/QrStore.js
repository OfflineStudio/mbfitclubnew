/* eslint-disable no-alert, no-console */

import {
    observable,
    action,makeObservable
    
} from 'mobx';
import {
    APIBase
} from '../configs/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStore from '../stores/AuthStore';
import LoginStore from '../stores/LoginStore';
class QrStore {
  
   
    constructor()
    {
        makeObservable(this);
    }
    @observable   Token = "";
    @observable   QrValue = "123";
    @observable   TimerStart = true;


    @action('setTimer')
    setTimer(start) {
        this.TimerStart = start;        
    }

    @action('setToken')
    setToken(tok) {
        this.Token = tok;        
    }

    @action('readQr')
    async readQr(success, failure) {
        try {
         
            this.loading = true;
            const userResult = await AsyncStorage.getItem('CoreMobile');
            const user = JSON.parse(userResult);
            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Mobile/ReadQr"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                }   ,
                body: JSON.stringify({
                    customerId: user.id,
                    token:     this.Token               
                })              
            });
            let responseJson = await response.json();    
           
            if (responseJson.isSuccess) {
                if (success) success();
            } else {
                if (failure) failure(responseJson.interactions[0].resultMessage);
            }
             

        } catch (error) {
            console.log(error)
        } finally {
            this.loading = false;
        }
    }
     
    @action('getQr')
    async getQr() {
      
         
            this.loading = true;
            const userResult = await AsyncStorage.getItem('CoreMobile');
            const user = JSON.parse(userResult);
            
var customerUid=LoginStore.numId.toString();
var saniyeCinsindenSure=LoginStore.timer;
var turnikeler = LoginStore.TurnIds;


var uid = "";
if (customerUid.length < 8) {
    for (var i = 0; i < 8 - customerUid.length; i++) {
        uid += "0";
    }
}
uid = uid + customerUid;

var indexer = Math.floor(Math.random() * 19);
if(indexer==0)
{
    indexer=17;
}

var totalKey = "QR1" + (indexer < 10 ? "0" + indexer : indexer.toString());
// console.log('indexer',indexer);
        var t = new Date();
t.setSeconds(t.getSeconds() + saniyeCinsindenSure);


        // var tmst =formatDate(t,'ddHHmmss');

        const padZero = (value) => (value < 10 ? `0${value}` : `${value}`);
        const parts = {
          
         
            dd: padZero(t.getDate()),
            HH: padZero(t.getHours()),
           
            mm: padZero(t.getMinutes()),
            ss: padZero(t.getSeconds()),
          
        };
  
    var tmst=parts['dd']+parts['HH']+parts['mm']+parts['ss'];
    //tmst="25180101";
    //   console.log(tmst);

        var result = 1;

        // if (result == 0)
        //     return "QR0Uyeliginiz sonlandigindan giris yapamazsiniz.";
  
    
        for (let i = 0; i < tmst.length; i++) {

            if (i % 2 == 0) {
                
                totalKey += String.fromCharCode(tmst[i].charCodeAt(0) + indexer);
            }
            else {
                totalKey += String.fromCharCode(tmst[i].charCodeAt(0) - indexer);
            }

        }
      
        for (var i = 0; i < uid.length; i++) {
            if (i % 2 == 0) {
                totalKey += String.fromCharCode(uid[i].charCodeAt(0) + indexer);
            }
            else {
                totalKey += String.fromCharCode(uid[i].charCodeAt(0) - indexer);
            }
        }



      


        var turnikeString = "h";

        turnikeler.forEach(myFunction);

        function myFunction(item) {
            turnikeString += item + 'h';
        }

        for (var i = 0; i < turnikeString.length; i++) {
            if (i % 2 == 0) {
                totalKey += String.fromCharCode(turnikeString[i].charCodeAt(0) + indexer);
            }
            else {
                totalKey += String.fromCharCode(turnikeString[i].charCodeAt(0) - indexer);
            }


        }

       console.log(totalKey);
        this.QrValue=totalKey;
    }
    //  formatDate (inputDate, format)  {
    //     if (!inputDate) return '';
    
    //     const padZero = (value) => (value < 10 ? `0${value}` : `${value}`);
    //     const parts = {
    //         yyyy: inputDate.getFullYear(),
    //         MM: padZero(inputDate.getMonth() + 1),
    //         dd: padZero(inputDate.getDate()),
    //         HH: padZero(inputDate.getHours()),
    //         hh: padZero(date.getHours() > 12 ? date.getHours() - 12 : date.getHours()),
    //         mm: padZero(inputDate.getMinutes()),
    //         ss: padZero(inputDate.getSeconds()),
    //         tt: inputDate.getHours() < 12 ? 'AM' : 'PM'
    //     };
    // console.log(parts);
    //     return format.replace(/yyyy|MM|dd|HH|hh|mm|ss|tt/g, (match) => parts[match]);
    // }
}


export default new QrStore();