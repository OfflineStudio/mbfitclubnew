/* eslint-disable no-alert, no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import {
    observable,
    action,
    makeAutoObservable
} from 'mobx';
import {
    APIBase,
    MobileVersion,CurrentCompany
} from '../configs/config';

import AuthStore from '../stores/AuthStore';
import translations from '../configs/translations';
import QrStore from '../stores/QrStore';
class LoginStore {
constructor()
{
    makeAutoObservable(this);
}

    @observable username = "";
   
    @observable password = "";
    @observable isValid = false;
    @observable loading = false;
    @observable currentUser = null;
    @observable sliderList = [];
    @observable anySlider = false;
      @observable version = "";
     
      @observable aboutUsUrl = "";
      @observable contactUrl = "";
      @observable branchUrl = "";
      @observable careerUrl = "";
      @observable newPurchases = "";
      @observable deviceId = "";
      @observable deviceToken = "";
      @observable loginScreen = "";
      @observable entry = 0;
      @observable entryMessage = "";
    // @observable  whatsapp = "";
    // @observable  phone = "";
    // @observable  realAccountList = null;
    // @observable  currentRealAccount = 0;
    // @observable  chatUrl='';
    // @observable  messageUrl = "";


    @observable aboutUsActive = true;
    @observable contactActive = true;
    @observable branchActive = true;
    @observable careerActive = true;
    @observable newPurchasesActive = true;

    @observable numId = "";
    @observable TurnIds = [];
    @observable timer = 10;
    @action('setDeviceToken')
    setDeviceToken(id) {
        
        this.deviceToken = id;
        
    }

    @action('setDeviceId')
    setDeviceId(id) {
        
        this.deviceId = id;
        
    }
   
    @action('setUsername')
    setUsername(username) {
        
        this.username = username;
        this.isValidate();
    }


    @action('setPassword')
    setPassword(password) {
        this.password = password;
        this.isValidate();
    }

    @action('setCurrentUser')
    setCurrentUser(user) {
        if (this.currentUser == null) {
            this.currentUser = user;
        }
    }

    @action('isValidate')
    isValidate() {
        
        if (this.username == "" || this.password == "") {
            this.isValid = false;

        } else {
            this.isValid = true;

        }
       
    }

    @action('getCurrentVersion')
    async getCurrentVersion() {
        try {
            let response = await fetch(APIBase("Mobile/GetCurrentVersion"), {
                method: "Get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            let responseJson = await response.json();
            if (responseJson.isSuccess) {
                this.version = responseJson.data.mobileVersion;              
               
            }

        } catch (error) {} finally {

        }
    }

    @action('login')
    async login(success, failure) {
        try {
            this.loading = true;

            let has = md5(this.password);
            await AuthStore.SetToken(this.username, has);
            await this.getCurrentVersion();
            // console.log('getCurrentVersion',this.version);
            // console.log('MobileVersion', MobileVersion)
            if (this.version=="")
            {
                if (failure) failure(translations.checkConnection);
            }
            else if (this.version != MobileVersion) {                
                if (failure) failure(translations.appversionwarning);

            } else {
                var token = await AuthStore.getToken();
               
                var request=JSON.stringify({
                    Username: this.username,
                    Password: has  ,
                    Device:   this.deviceId  ,
                    DeviceToken:this.deviceToken,                
                });
              
                let response = await fetch(APIBase("Mobile/Login"), {
                    method: "Post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + token
                    },
                    body: request
                });


                let responseJson = await response.json();
  
                if (responseJson.isSuccess) {
                    
                    await AsyncStorage.setItem("CoreMobile", JSON.stringify(responseJson.data));
                   
                    
                   
                    this.currentUser = responseJson.data;
                //    console.log(responseJson.data);
                   this.aboutUsUrl=responseJson.data.aboutUs;
                   this.contactUrl=responseJson.data.contact;
                     this.branchUrl=responseJson.data.branch;
                     this.careerUrl=responseJson.data.career;
                     this.newPurchases=responseJson.data.newPurchases;
                     this.loginScreen=responseJson.data.loginScreen;
                     this.TurnIds=responseJson.data.turnIds;
                     this.numId=responseJson.data.numId;
                     this.timer=responseJson.data.timer;
                     this.entry=responseJson.data.entry;
                     this.entryMessage=responseJson.data.entryMessage;
                     var remember=JSON.stringify({
                        Username: this.username,
                        Password:  this.password,
                        LoginScreen:this.loginScreen
                        
                                 
                    });
                     await AsyncStorage.setItem("FitUser2", remember);
                 
                    // this.getSlider();
                    // await  this.setDevice(responseJson.data.id);
                
               
                    if (success) success();
                } else {
                    if (failure) failure(responseJson.interactions[0].resultMessage);
                }

            }


        } catch (error) {
            if (failure) failure(translations.accountpasswordwarning);
            console.log(error);
        } finally {
            this.loading = false;
        }
    }

    // @action('setDevice')
    // async setDevice(customerId) {
    //     try {

    //         var token = await AuthStore.getToken();
    //         const device = await AsyncStorage.getItem('FxDevice');
    //         const deviceToken = await AsyncStorage.getItem('FxDeviceToken');
    //         let response = await fetch(APIBase("Mobile/SetDevice"), {
    //             method: "Post",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 'Authorization': 'Bearer ' + token
    //             },
    //             body: JSON.stringify({
    //                 customerId: customerId,
    //                 deviceToken: deviceToken,
    //                 device: device

    //             })
    //         });


    //         let responseJson = await response.json();

    //     } catch (error) {

    //         console.log(error);
    //     } finally {
    //         this.loading = false;
    //     }
    // }
    
   
    @action('setAuth')
    async setAuth() {
        try {
            const userResult = await AsyncStorage.getItem('FitUser2');
 
    if(userResult!=null){
      const user = JSON.parse(userResult);
    
      if (user != null && user.Username != null) {
        // console.log('user',user);
        this.setUsername(user.Username);
        this.setPassword(user.Password);
       this.loginScreen=user.LoginScreen;
       
      }
    }

        } catch (error) {} finally {
            
        }
    }
   
}


export default new LoginStore();