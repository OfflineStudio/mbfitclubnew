/* eslint-disable no-alert, no-console */
 
import {
    observable,
    action,makeObservable
} from 'mobx';
import {
    APIBase
} from '../configs/config';
import translations from '../configs/translations';
import AuthStore from '../stores/AuthStore';
class ForgotPasswordStore {
    constructor()
{
    makeObservable(this);
}
    @observable   username = "";  
    @observable isValid = false;
    @observable loading=false;

    @action('setUsername')
    setUsername(username) {
        this.username = username;
        this.isValidate();
    }

   

    @action('isValidate')
    isValidate() {

        if (this.username == ""  ) {
            this.isValid = false;

        } else {
            this.isValid = true;

        }

    }
    @action('forgot')
    async forgot(success, failure) {
        try {
            this.loading = true;

        
               
                let response = await fetch(APIBase("Mobile/ForgotPassword"), {
                    method: "Post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      
                    },
                    body: JSON.stringify({
                        Username: this.username                    
                    })
                });


                let responseJson = await response.json();
  
               if (responseJson.isSuccess) {                
                if (success) success();
            } else {
                if (failure) failure();
            }

          


        } catch (error) {
            if (failure) failure(translations.accountpasswordwarning);
            console.log(error);
        } finally {
            this.loading = false;
        }}

}
 

export default new ForgotPasswordStore();