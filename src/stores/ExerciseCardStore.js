/* eslint-disable no-alert, no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import {
    observable,
    action,
    makeObservable
} from 'mobx';
import {
    APIBase
} from '../configs/config';

import AuthStore from '../stores/AuthStore';
import translations from '../configs/translations';
 
class ExerciseCardStore {
constructor()
{
    makeObservable(this);
}

    
    @observable loading = false;
    
    @observable cardList = [];
    @observable dayList = null;
    @observable selectedImage = "";
    @observable selectedVideo = "";

    @action('setselectedVideo')
    setselectedVideo(key) {
        this.selectedVideo = key;         
    }

    @action('setselectedImage')
    setselectedImage(key) {
        this.selectedImage = key;         
    }

    @action('setCurrentUser')
   getExerciseForDay(day) {
        if (day == "Ant1") {
            this.dayList = this.cardList.filter(x => x.ant1==true);
            console.log(this.dayList);
        }
        else if(day == "Ant2")
        {
            this.dayList = this.cardList.filter(x => x.ant2==true);
        }
        else if(day == "Ant3")
        {
            this.dayList = this.cardList.filter(x => x.ant3==true);
        }
        else if(day == "Ant4")
        {
            this.dayList = this.cardList.filter(x => x.ant4==true);
        }
        else if(day == "Ant5")
        {
            this.dayList = this.cardList.filter(x => x.ant5==true);
        }
        else if(day == "Ant6")
        {
            this.dayList = this.cardList.filter(x => x.ant6==true);
        }
        else if(day == "Ant7")
        {
            this.dayList = this.cardList.filter(x => x.ant7==true);
        }
        
    }

     
    
    @action('getexercisecard')
    async getexercisecard() {
        try {
            this.loading = true;

                var token = await AuthStore.getToken();
                const userResult = await AsyncStorage.getItem('CoreMobile');
                const user = JSON.parse(userResult);
                let response = await fetch(APIBase("Mobile/GetExerciseCard"), {
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
                    this.cardList = responseJson.data; 
                } 

          


        } catch (error) {
            if (failure) failure(translations.accountpasswordwarning);
            console.log(error);
        } finally {
            this.loading = false;
        }
    }


   

    
    
   

    
}


export default new ExerciseCardStore();