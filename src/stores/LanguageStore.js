/* eslint-disable no-alert, no-console */

import {
    observable,
    action,makeObservable
    
} from 'mobx';
import {
    APIBase
} from '../configs/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../configs/translations';
class LanguageStore {

    constructor()
    {
        makeObservable(this);
    }
    
    
    @observable translations = null;
    @observable defaultLang = 'en';
    



   
    @action('getLang')
     getLang() {
       
        this.translations=strings         
      
    }
   

}


export default new LanguageStore();