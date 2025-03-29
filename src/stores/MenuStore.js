import {
    observable,
    action,
    makeAutoObservable
} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    APIBase
   
} from '../configs/config';
import AuthStore from '../stores/AuthStore';
class MenuStore {
    constructor()
{
    makeAutoObservable(this);
}
    @observable selectedMenuItem = 0;

    @observable BankDeposit = false
    @observable MobileDeposit = false
    @observable SkrillDeposit = false
    @observable EnvoyDeposit = false
    @observable EnvoyQrDeposit = false
    @observable BtcDeposit = false
    @observable PaparaDeposit = false
    @observable BankWithdrawal = false
    @observable SkrillWithdrawal = false
    @observable EnvoyWithdrawal = false
    @observable BtcWithdrawal = false
    @observable PaparaWithdrawal = false

    @observable depositMethods = null
    @observable withdrawalMethods = null

    


    @action('setSelectedMenuItem')
    setSelectedMenuItem(selectedMenuItem) {
        if (this.selectedMenuItem == selectedMenuItem) {
            this.selectedMenuItem = 0;
        } else {
            this.selectedMenuItem = selectedMenuItem;
        }

    }
   
    @action('setAuth')
    async setAuth() {
        try {
            const userResult = await AsyncStorage.getItem('CoreMobile');
            const user = JSON.parse(userResult);
            this.depositMethods = user.depositMethods;
            this.withdrawalMethods = user.withdrawalMethods;

        } catch (error) {} finally {
            
        }
    }
   
}


export default new MenuStore();