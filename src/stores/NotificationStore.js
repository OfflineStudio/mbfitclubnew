/* eslint-disable no-alert, no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    observable,
    action,
    makeObservable
} from 'mobx';
import {  APIBase} from '../configs/config';

import AuthStore from '../stores/AuthStore';

class NotificationStore {
constructor()
{
    makeObservable(this);
}

        
    @observable loading = false;
    @observable notif = [];
    @observable notifAlert = false;


    @action('setAlert')
    setAlert(text) {    
     this.notifAlert = text;
 }
     
 

    @action('getNotification')
    async getNotification() {
        try {
          
            this.loading = true;
            const userResult=await AsyncStorage.getItem('CoreMobile');
            const user=JSON.parse(userResult);
            var token = await AuthStore.getToken();

          
            let response = await fetch(APIBase("Mobile/GetNotificationList"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    Customer: user.id,
                     
                })
            });


            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.isSuccess) {
                this.notif = responseJson.data;      
            }  
            console.log(responseJson);
            

        } catch (error) {} finally {

        }
    }
 
 

    
}


export default new NotificationStore();