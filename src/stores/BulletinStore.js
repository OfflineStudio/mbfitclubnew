/* eslint-disable no-alert, no-console */
 
import {
    observable,
    action,makeObservable
} from 'mobx';
import {
    APIBase
} from '../configs/config';

import AuthStore from '../stores/AuthStore';
class BulletinStore {
    constructor()
{
    makeObservable(this);
}
    @observable  data = null;
    @observable  loading=false;
    @observable selectedItem="";
    @observable refresh=false;

    @action('setSelected')
    setSelected(id) {
        
        this.selectedItem = id;  
        this.refresh=true;
    }

    @action('getData')
    async getData() {
        try {
            this.loading = true;

            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Mobile/GetBulletin"), {
                method: "Get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
               
            });


            let responseResult = await response;
            if (responseResult.status == 200) {
                let responseJson = await responseResult.json();

                if (responseJson.isSuccess) {
                    this.data = responseJson.data;
                }

            }else{
                AuthStore.isSuccess=false;
            }
             
        } catch (error) {
            
            
        } finally {
            this.loading = false;
        }
    }

}
 

export default new BulletinStore();