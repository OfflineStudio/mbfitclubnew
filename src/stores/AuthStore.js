/* eslint-disable no-alert, no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    observable,
    action,makeObservable
    
} from 'mobx';
import {
    APIBase
} from '../configs/config';

class AuthStore {
    constructor()
{
    makeObservable(this);
}
    @observable isSuccess = false;
    @observable apiToken = '';

    @action('getToken')
    async getToken() {
        try {

            const token = await AsyncStorage.getItem('CoreToken');
            // console.log('getToken--', token);
            if (token == null) {
                this.isSuccess = false
            } else {
                const tokenJson = JSON.parse(token);
                return tokenJson.token;

                this.isSuccess = true
            }

        } catch (error) {
            this.isSuccess = false

        }
    }

    @action('SetToken')
    async SetToken(username, password) {

        try {
            this.loading = true;
            let response = await fetch(APIBase("Auth/Token"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password,
                    username: username,
                     

                })
            });

            if (response.status == 200) {
                let responseJson = await response.json();
                await AsyncStorage.setItem('CoreToken', JSON.stringify(responseJson));
                this.apiToken = responseJson.token;
                this.isSuccess = true;
            }


        } catch (error) {
            this.isSuccess = false;
            console.log(error)
        } finally {

        }
    }
    @action('userLogout')
    async userLogout() {
        try {
            AsyncStorage.removeItem('CoreMobile');
            AsyncStorage.removeItem('CoreToken');

        } catch (error) {


        }
    }

}

export default new AuthStore();