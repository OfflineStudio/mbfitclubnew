/* eslint-disable*/

import {
  StyleSheet,
  Platform
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //  alignItems:"center",
    // eslint-disable-next-line comma-dangle
    backgroundColor: '#fff',
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  pagecontainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: null,
    height: null,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f8f9fa'

  },
  loginInput: {
    padding: 10,
    height: 40,
    borderWidth: 1,
    margin: 10,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#e0e0e0',
    fontSize: 13
  },
  loginLogo: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,

  },
  loginButton: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    // borderColor: '#00ACFF33',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({

      android: {
        shadowColor: 'black',
        shadowOpacity: 1,
      },
    }),

    elevation: 1
  },
  loginButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginForgetPasText: {

    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  homeMainBoxImage: {
 
    width: 150,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
  },
  homeMainBox: {
     
    shadowColor: 'black',
    shadowOpacity: 5,
    elevation: 2,
    borderRadius: 20,
  },
  ssstitleStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700'
  },
  sssdescriptionStyle: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 13,
    color: 'gray'
  },
  sssWrapper: {
   flex:1,
   minHeight: 50,
    margin: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#dddddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountActivitiesWrapper: {
    minHeight: 50,
    margin: 10,
    borderWidth: 5,
    borderRadius: 8,
    borderColor: '#dddddd',

  },
  bankAccountInput: {
    padding: 10,
    height: 40,
    borderWidth: 1,
    margin: 10,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#e0e0e0',
    fontSize: 13
  },
  bankAccountText: {
    padding: 10,

  },
  bankAccountRequire: {
    fontSize: 8,
    color: 'red',
    marginLeft: 10,
  },
  withdrawalInput: {
    padding: 10,
    height: 100,
    borderWidth: 1,
    margin: 10,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#e0e0e0',
    fontSize: 13
  },
  documentWrapper: {
    minHeight: 50,
    margin: 10,
    borderWidth: 5,
    borderRadius: 8,
    borderColor: '#dddddd',

  },
  announcementWrapper: {
    flex:1,
minHeight: 50,
    margin: 10,
    borderWidth: 5,
    borderRadius: 8,
    borderColor: '#dddddd',

  },
  bankAccountWrapper: {
    flex:1,
minHeight: 50,
    margin: 10,
    borderWidth: 5,
    borderRadius: 6,
    borderColor: '#dddddd',

  },
  bankAccountTitleText: {
    fontWeight: '700',
    marginLeft:10,
    marginTop:10

  },
  bankAccountContentText: {
    fontWeight: '700',
     marginTop:10,
    color: 'grey',
    marginLeft: 5,

  },
  bankAccountEditButton: {
    margin: 20,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    // borderColor: '#00ACFF33',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({

      android: {
        shadowColor: 'black',
        shadowOpacity: 1,
      },
    }),

    elevation: 1

  },
  bankAccountEditButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  homePageContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: null,
    height: null,
    alignItems: 'center',
    marginTop:30,
    backgroundColor: '#f8f9fa'

  }, 
   topBannerContainer: {
    flexDirection: "row",
    backgroundColor: "#ffcc00",
    color: "#ffffff",
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
    flexWrap: 'wrap'
  },
  topBannerIcon: {
    color: "#ffffff",
    marginRight: 6,
    marginTop: 2
  },
  topBannerText: {
    color: "#ffffff",
    flexWrap: 'wrap'
  },
  bannerContainerWrapper: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  bannerContainer: {
    flexDirection: "row",
    backgroundColor: "gray",
    color: "#ffffff",
    padding: 24,
    borderRadius: 4,
    marginBottom: 10
  },
  bannerIcon: {
    color: "#ffffff",
    paddingRight: 2
  },
  bannerText: {
    color: "#ffffff",
    padding: 2
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingTop:30,
  },
  bottomIcon: {
    borderWidth: 1,   
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#e0e0e0',
  },
});