import React from 'react';
import { createContext, useContext } from 'react';
import rootStore from './RootStore';

export const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore hook\'u bir StoreProvider içinde kullanılmalıdır!');
  }
  return store;
} 