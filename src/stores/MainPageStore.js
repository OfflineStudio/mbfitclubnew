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
class MainPageStore {

    constructor()
    {
        makeObservable(this);
    }
    
    
    @observable morningNewsletter = '';
    @observable signalUrl = '';
    @observable noonNewsletter = '';
    @observable eveningNewsletter = '';
    @observable youtubeLink =   '';
    @observable isLive = false;



   
    @action('checkMainPage')
    async checkMainPage() {
        try {
           
            this.loading = true;
            const userResult = await AsyncStorage.getItem('CoreMobile');
            const user = JSON.parse(userResult);
            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Mobile/GetMainPage"), {
                method: "Get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                } 
                             
            });


            let responseJson = await response.json();
             this.morningNewsletter=responseJson.data.morningNewsletter;
              this.noonNewsletter = responseJson.data.noonNewsletter;
              this.eveningNewsletter = responseJson.data.eveningNewsletter;
              this.youtubeLink = responseJson.data.youtubeLink;
              this.isLive = responseJson.data.isLive;
              this.signalUrl=responseJson.data.signalUrl;
             

        } catch (error) {
            console.log(error)
        } finally {
            this.loading = false;
        }
    }
   

}


export default new MainPageStore();