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
class AccountStore {
    constructor()
{
    makeObservable(this);
}
    @observable dataReal = null;
    @observable loading = false;

    @observable refresh = false;


    @action('getRealAccounts')
    async getRealAccounts() {
        try {
            this.loading = true;
            const userResult=await AsyncStorage.getItem('CoreMobile');
            const user=JSON.parse(userResult);
            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Customer/GetRealAccounts"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    CustomerId: user.id,
                     
                })
            });
           
            let responseJson = await response.json();
           
            if (responseJson.isSuccess) {
                this.dataReal = responseJson.data;
            }
             

        } catch (error) {


        } finally {
            this.loading = false;
        }
    }

}


export default new AccountStore();