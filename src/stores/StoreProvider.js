import React from 'react';
import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';

class RootStore {
  constructor() {
    this.userData = null;
    makeAutoObservable(this);
  }

  setUserData(data) {
    this.userData = data;
  }
}

const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
}; 