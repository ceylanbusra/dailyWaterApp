import React from 'react';
import RootRouter from './navigation/navigation';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store/Store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  if (__DEV__) {
    import('./utils/reactotron.js').then(() => 'Reactotron Configured');
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
