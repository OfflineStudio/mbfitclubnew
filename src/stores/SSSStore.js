/* eslint-disable no-alert, no-console */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    observable,
    action,
    makeObservable
} from 'mobx';
import { APIBase } from '../configs/config';

import AuthStore from '../stores/AuthStore';
import LoginStore from '../stores/LoginStore';

class SSSStore {
    constructor() {
        makeObservable(this);
    }

    @observable selectLongText = "";  
    @observable selectShortText = "";  
    @observable loading = false;
    @observable sss = [];

    @action('setSSS')
    async setSSS(longtext, shorttext) {          
        try {
            console.log('setSSS çağrıldı:', { longtext, shorttext });
            
            if (!longtext || !shorttext) {
                console.error('setSSS: Eksik parametreler:', { longtext, shorttext });
                return;
            }

            this.selectLongText = longtext;
            this.selectShortText = shorttext;

            console.log('setSSS tamamlandı:', {
                selectLongText: this.selectLongText,
                selectShortText: this.selectShortText
            });
        } catch (error) {
            console.error('setSSS hatası:', error);
        }
    }

    @action('getSSS')
    async getSSS() {
        try {
            console.log('getSSS başladı');
            this.loading = true;

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
            console.log('getSSS yanıtı:', responseJson);

            if (responseJson.isSuccess) {
                this.sss = responseJson.data;              
                console.log('SSS verileri güncellendi, toplam:', this.sss.length);
            } else {
                console.error('getSSS başarısız:', responseJson);
            }
        } catch (error) {
            console.error('getSSS hatası:', error);
        } finally {
            this.loading = false;
            console.log('getSSS tamamlandı');
        }
    }
}

export default new SSSStore();