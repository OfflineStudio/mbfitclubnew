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
class BranchStore {
constructor()
{
    makeObservable(this);
}

    @observable selectBranchUrl = "";    
    @observable selectBranchName = "";  
    @observable loading = false;
    @observable branches = [];
     



    @action('setBranch')
    async  setBranch(id,name) {    
        const userResult=await AsyncStorage.getItem('CoreMobile');
            const user=JSON.parse(userResult);    
        this.selectBranchName = name; 
        this.  selectBranchUrl=     LoginStore.branchUrl+"/"+id+"/"+user.id;
    }
 

    @action('getBranch')
    async getBranch() {
        try {
            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Mobile/GetAllActiveBranches"), {
                method: "Get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
            });
            let responseJson = await response.json();
            if (responseJson.isSuccess) {
                this.branches = responseJson.data;              
               
            }

        } catch (error) {} finally {

        }
    }
 
 

    
}


export default new BranchStore();