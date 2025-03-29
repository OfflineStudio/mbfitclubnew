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
import md5 from 'md5';
class ChangePasswordStore {
    constructor()
{
    makeObservable(this);
}
    @observable  oldPassword = "";
    @observable password = "";
    @observable passwordConfirm = "";
    @observable isValid = false;
    @observable loading = false;

    @action('setOldPassword')
    setOldPassword(oldPassword) {
        this.oldPassword = oldPassword;
        this.isValidate();
    }
    @action('setPassword')
    setPassword(password) {
        this.password = password;
        this.isValidate();
    }
    @action('setPasswordConfim')
    setPasswordConfim(passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
        this.isValidate();
    }
    @action('isValidate')
    isValidate() {

        if (this.oldPassword == "" || this.password == "" || this.passwordConfirm == "" || (this.password != this.passwordConfirm)) {
            this.isValid = false;

        } else {
            this.isValid = true;

        }

    }
    @action('change')
    async change(success, failure) {
        try {
            this.loading = true;
            const userResult=await AsyncStorage.getItem('CoreMobile');
            const user=JSON.parse(userResult);
            var token = await AuthStore.getToken();

            let hashpass = md5(this.password);
            let hashpassconf = md5(this.passwordConfirm);
            let hashpassold = md5(this.oldPassword);
// console.log("password",this.password);
// console.log("passwordConfirm",this.passwordConfirm);
// console.log("oldPassword",this.oldPassword);
            let response = await fetch(APIBase("Mobile/ChangePassword"), {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    CustomerId: user.id,
                    OldPassword: hashpassold,
                    Password:hashpass,
                    PasswordConfirm:hashpassconf
                })
            });


            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.isSuccess) {
                if (success) success();
            } else {
                
                if (failure) failure(responseJson.interactions[0].resultMessage);
            }
            console.log(responseJson);
        } catch (error) {
            
            if (failure) failure("");
            console.log(error);
        } finally {
            this.loading = false;
        }
    }

}


export default new ChangePasswordStore();