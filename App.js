import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react'
import { Provider, useSelector } from 'react-redux'
import Routes from './src/routes'
import { store } from './src/app/store'
import { selectCurrentToken } from './src/features/authSlice'

export default function App() {
  

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
