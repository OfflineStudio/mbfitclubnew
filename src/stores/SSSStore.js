/* eslint-disable no-alert, no-console */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    observable,
    action,
    makeObservable
} from 'mobx';
import {  APIBase} from '../configs/config';

import AuthStore from '../stores/AuthStore';
import LoginStore from '../stores/LoginStore';
class SSSStore {
constructor()
{
    makeObservable(this);
}

     
    @observable selectLongText = "";  
    @observable selectShortText = "";  
    @observable loading = false;
    @observable sss = [];
     



    @action('setSSS')
    async  setSSS(longtext,shorttext) {          
         
        this.selectLongText=longtext;
        this.selectShortText=shorttext;
    }
 

    @action('getSSS')
    async getSSS() {
        try {
            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Mobile/GetSSS"), {
                method: "Get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
            });
            let responseJson = await response.json();
            if (responseJson.isSuccess) {
                this.sss = responseJson.data;              
               
            }

        } catch (error) {} finally {

        }
    }
 
 

    
}


export default new SSSStore();