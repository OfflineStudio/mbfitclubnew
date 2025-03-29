/* eslint-disable no-alert, no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';

import {
    observable,
    action,
    makeObservable
} from 'mobx';
import {
    APIBase,
    MobileVersion,CurrentCompany
} from '../configs/config';

import AuthStore from '../stores/AuthStore';
import translations from '../configs/translations';

class CustomerIdentityStore {
constructor()
{
    makeObservable(this);
}

  
    @observable isValid = false;
    @observable loading = false;
    @observable   PhoneNumber = "";
    @observable   Address = "";
    @observable   PhotoUrl = "";
    @observable data=null;
    @observable   BirthDate = "";
    @observable BirthDateModal = false;
    @action('setdata')
    setdata(data) {
        this.data = data;        
        this.isValidate();
    }
     
    @action('setBirthdate')
    setBirthdate(birth) {
        this.BirthDate = birth;
        this.isValidate();
    }
    @action('setBirthDateModal')
    setBirthDateModal(val) {
        this.BirthDateModal = val;
        
    }
    @action('setPhoneNumber')
    setPhoneNumber(phone) {
        this.PhoneNumber = phone;
        this.isValidate();
    }

    @action('isValidate')
    isValidate() {
        
        // if (this.PhoneNumber == "") {
        //     this.isValid = false;

        // } else {
        //     this.isValid = true;

        // }
        if (this.BirthDate == "") {
            this.isValid = false;

        } else {
            this.isValid = true;

        }
    }

    @action('getInfo')
    async getInfo() {
        try {
            this.loading = true;
            var token = await AuthStore.getToken();
            const userResult = await AsyncStorage.getItem('CoreMobile');
            const user = JSON.parse(userResult);
            let response = await fetch(APIBase("Mobile/GetCustomerInfo"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    Customer: user.id

                })
            });


            let responseJson = await response.json();

            if (responseJson.isSuccess) {
                let data = responseJson.data;
                if (data != null) {
                    this.PhoneNumber=data.phoneNumber;
                    this.BirthDate=data.birthDate
                    this.PhotoUrl=data.photo;
                }
            }

        } catch (error) {


        } finally {
            this.loading = false;
        }
    }
   
   
    @action('setInfo')
    async setInfo(success, failure) {
        try {
            
            var token = await AuthStore.getToken();
            const userResult = await AsyncStorage.getItem('CoreMobile');
            const user = JSON.parse(userResult);

            // let response = await fetch(APIBase("Mobile/SetCustomerInfo"), {
            //     method: "Post",
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //         'Authorization': 'Bearer ' + token
            //     },
            //     body: JSON.stringify({
            //         CustomerId: user.id,
            //         PhotoLogicalName:this.data.fileName,
            //         PhotoContent:this.data.base64,
            //         PhoneNumber:this.PhoneNumber
                    
            //     })
            // });
            let response = await fetch(APIBase("Mobile/SetBirthDateInfo"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    CustomerId: user.id,
                    BirthDate:this.BirthDate
                    
                })
            });
            this.loading = true;

            let responseJson = await response.json();
             
            if (responseJson.isSuccess) {
                if (success) success();
            }else {
                if (failure) failure(responseJson.interactions[0].resultMessage);
            }

        } catch (error) {
            console.log(error)
            if (failure) failure("");
        } finally {
            this.loading = false;
        }
    }

    
}


export default new CustomerIdentityStore();