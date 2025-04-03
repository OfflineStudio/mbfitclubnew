import { createRef } from 'react';

export const navigationRef = createRef();

export const NavigationService = {
  navigate(name, params) {
    if (navigationRef.current) {
      navigationRef.current.navigate(name, params);
    }
  },
  
  goBack() {
    if (navigationRef.current) {
      navigationRef.current.goBack();
    }
  },
  
  reset(name, params) {
    if (navigationRef.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name, params }],
      });
    }
  }
}; 