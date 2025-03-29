/* eslint-disable no-alert, no-console */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    observable,
    action,makeObservable
} from 'mobx';
import {
    APIBase
} from '../configs/config';

import AuthStore from '../stores/AuthStore';
class LastEntryStore {
    constructor()
{
    makeObservable(this);
}
    @observable dataEntry = null;
    @observable loading = false;

     


    @action('getEntry')
    async getEntry() {
        try {
            this.loading = true;
            const userResult=await AsyncStorage.getItem('CoreMobile');
            const user=JSON.parse(userResult);
            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Mobile/GetEntryHistories"), {
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
           
            if (responseJson.isSuccess) {
                this.dataEntry = responseJson.data;
            }
             

        } catch (error) {


        } finally {
            this.loading = false;
        }
    }

}


export default new LastEntryStore();