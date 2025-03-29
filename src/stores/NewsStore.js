/* eslint-disable no-alert, no-console */
 
import {
    observable,
    action,
    makeObservable
} from 'mobx';
import {  APIBase} from '../configs/config';

import AuthStore from '../stores/AuthStore';

class NewsStore {
constructor()
{
    makeObservable(this);
}

    @observable selectNews = null;       
    @observable loading = false;
    @observable news = [];
     



    @action('setNews')
       setNews(id) {    
        this.selectNews = this.news.find(x => x.id==id);
        console.log(this.selectNews);
    }
 

    @action('getNews')
    async getNews() {
        try {
            var token = await AuthStore.getToken();
            let response = await fetch(APIBase("Mobile/GetNews"), {
                method: "Get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
            });
            let responseJson = await response.json();
            if (responseJson.isSuccess) {
                this.news = responseJson.data;              
               console.log( responseJson.data);
            }

        } catch (error) {} finally {

        }
    }
 
 

    
}


export default new NewsStore();