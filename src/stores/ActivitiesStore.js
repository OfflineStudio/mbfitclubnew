/* eslint-disable no-alert, no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    observable,
    action,
    makeObservable
} from 'mobx';

import {  APIBase} from '../configs/config';

import AuthStore from '../stores/AuthStore';

class ActivitiesStore {
constructor()
{
    makeObservable(this);
}

    @observable selectTypeId = "";       
    @observable selectTypeText = "";      
    @observable loading = false;
    @observable types = [];
    @observable activities = null;
    @observable selectActivityId = ""; 


    @action('setType')
    setType(id) {    
        this.selectTypeId = id;        
    }
    @action('setTypeText')
    setTypeText(text) {    
        this.selectTypeText = text;        
    }
    @action('setActivity')
    setActivity(id) {    
        this.selectActivityId = id;        
    }

    @action('getTypes')
    async getTypes() {
        try {
            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Mobile/GetActivitiesType"), {
                method: "Get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
            });
            let responseJson = await response.json();
            if (responseJson.isSuccess) {
                this.types = responseJson.data;              
               
            }

        } catch (error) {} finally {

        }
    }
    @action('getActivities')
    async getActivities() {
        try {
            this.loading = true;

                var token = await AuthStore.getToken();
                const userResult = await AsyncStorage.getItem('CoreMobile');
                const user = JSON.parse(userResult);
                let response = await fetch(APIBase("Mobile/GetListActivities"), {
                    method: "Post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        CustomerId: user.id,
                        ProductTypeId:this.selectTypeId

                    })
                });


                let responseJson = await response.json();
  
                if (responseJson.isSuccess) {                   
                    this.activities = responseJson.data; 
                    console.log(responseJson.data);
                } 

          


        } catch (error) {
            if (failure) failure(translations.accountpasswordwarning);
            console.log(error);
        } finally {
            this.loading = false;
        }
    }


    @action('makeReservation')
    async makeReservation(success, failure) {
        try {
            this.loading = true;

                var token = await AuthStore.getToken();
                const userResult = await AsyncStorage.getItem('CoreMobile');
                const user = JSON.parse(userResult);
                let response = await fetch(APIBase("Mobile/MakeReservation"), {
                    method: "Post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        CustomerId: user.id,
                        ActivityId:this.selectActivityId

                    })
                });


                let responseJson = await response.json();
                if (responseJson.isSuccess) {
                    if (success) success();
                }else {
                    if (failure) failure(responseJson.interactions[0].resultMessage);
                }

          


        } catch (error) {
            if (failure) failure(translations.accountpasswordwarning);
            console.log(error);
        } finally {
            this.loading = false;
        }
    }

    @action('cancelReservation')
    async cancelReservation(success, failure) {
        try {
            this.loading = true;

                var token = await AuthStore.getToken();
                const userResult = await AsyncStorage.getItem('CoreMobile');
                const user = JSON.parse(userResult);
                let response = await fetch(APIBase("Mobile/CancelReservation"), {
                    method: "Post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        CustomerId: user.id,
                        ActivityId:this.selectActivityId

                    })
                });


                let responseJson = await response.json();
                if (responseJson.isSuccess) {
                    if (success) success();
                }else {
                    if (failure) failure(responseJson.interactions[0].resultMessage);
                }

          


        } catch (error) {
            if (failure) failure(translations.accountpasswordwarning);
            console.log(error);
        } finally {
            this.loading = false;
        }
    }

    
}


export default new ActivitiesStore();