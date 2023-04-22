import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducers';
import middleware from './middleware';


const setupStore = (preloadedState) => {
  return configureStore({
    reducer,
    middleware,
    preloadedState
  });
};

export default setupStore;