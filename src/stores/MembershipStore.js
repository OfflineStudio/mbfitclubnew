/* eslint-disable no-alert, no-console */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    observable,
    action,
    makeObservable
} from 'mobx';
import {  APIBase} from '../configs/config';

import AuthStore from '../stores/AuthStore';
 
class MembershipStore {
constructor()
{
    makeObservable(this);
}

@observable membershipId = null;
    @observable loading = false;
    @observable memberships = [];
         
 
    @action('setmembershipId')
    setmembershipId(text) {
        this.membershipId = text;       
    }

    @action('getMemberships')
    async getMemberships() {
        try {
            this.loading = true;

                var token = await AuthStore.getToken();
                const userResult = await AsyncStorage.getItem('CoreMobile');
                const user = JSON.parse(userResult);
                let response = await fetch(APIBase("Mobile/GetPurchasesInfo"), {
                    method: "Post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        customer: user.id                      
                    })
                });


                let responseJson = await response.json();
  
                if (responseJson.isSuccess) {                   
                    this.memberships = responseJson.data; 
                }         


        } catch (error) {
            if (failure) failure(translations.accountpasswordwarning);
            console.log(error);
        } finally {
            this.loading = false;
        }
    }

    @action('suspendMembership')
    async suspendMembership(success, failure) {
        try {
            this.loading = true;        
           
            var token = await AuthStore.getToken();
            const userResult = await AsyncStorage.getItem('CoreMobile');
            const user = JSON.parse(userResult);
            let response = await fetch(APIBase("Mobile/SuspendMembership"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    CustomerId: user.id ,
                    MembershipId:this.membershipId
                })
            });


            let responseJson = await response.json();

            
            if (responseJson.isSuccess) {
                if (success) success();
            } else {
                if (failure) failure(responseJson.interactions[0].resultMessage);
            }

        } catch (error) {
            if (failure) failure("");
            console.log(error)
        } finally {
            this.loading = false;
        }
    }
    @action('unSuspendMembership')
    async unSuspendMembership(success, failure) {
        try {
            this.loading = true;        
           
            var token = await AuthStore.getToken();
            const userResult = await AsyncStorage.getItem('CoreMobile');
            const user = JSON.parse(userResult);
            let response = await fetch(APIBase("Mobile/UnSuspendMembership"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    CustomerId: user.id,
                    MembershipId:this.membershipId                  
                })
            });


            let responseJson = await response.json();

            
            if (responseJson.isSuccess) {
                if (success) success();
            } else {
                if (failure) failure(responseJson.interactions[0].resultMessage);
            }

        } catch (error) {
            if (failure) failure("");
            console.log(error)
        } finally {
            this.loading = false;
        }
    }
    
}


export default new MembershipStore();