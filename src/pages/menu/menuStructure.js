import translations from '../../configs/translations'

import {  externalLink} from '../../configs/config'



export default menuStructure = [
    {
        id: 1,
        category: "Kullanıcı",
        menus: [
            {
                id: 1,
                title: translations.userinfo,
                icon: "address-book",
                screen: "CustomerIdentityScreen"
                ,isActive:true
            },
            {
                id: 2,
                title: translations.changepassword,
                icon: "asterisk",
                screen: "ChangePasswordScreen"
                ,isActive:true
            }
        ]
    },
    {
        id: 2,
        category: "Mb Fit Club",
        menus: [
            {
                id: 1,
                title: translations.aboutus,
                icon: "info-circle",
                screen: "AboutUsScreen"
                ,isActive:true
            },
            {
                id: 2,
                title: translations.branches,
                icon: "random",
                screen: "BranchScreen"
                ,isActive:true
            },
            {
                id: 3,
                title:  translations.contact,
                icon: "map-signs",
                screen: "ContactScreen"
                ,isActive:true
            },
            {
                id: 4,
                title:  translations.sss,
                icon: "question-circle",
                screen: "SSSScreen"
                ,isActive:true
            }
            ,
            {
                id: 5,
                title:  translations.career,
                icon: "vcard",
                screen: "CareerScreen"
                ,isActive:true
            }
        ]
    },
    {
        id: 3,
        category: translations.account,
        menus: [
            {
                id: 1,
                title: translations.memberships,
                icon: "book",
                screen: "MembershipScreen"
                ,isActive:true
            },
            {
                id: 2,
                title: translations.newpurchases,
                icon: "rocket",
                screen: "newPurchasesScreen"
                ,isActive:false
            },
            {
                id: 3,
                title: translations.entryrecords,
                icon: "list",
                screen: "LastEntriesScreen"
                ,isActive:true
            },
            
           
        ]
    },
    {
        id: 4,
        category: translations.others,
        menus: [
            
            {
                id: 1,
                title: translations.logout,
                icon: "power-off",
                screen: "LogoutScreen"
                ,isActive:true
            }
        ]
    }
];