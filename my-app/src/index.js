import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

import {ThemeProvider} from 'styled-components'
import { composeWithDevTools} from "redux-devtools-extension"


const store = createStore(reducer, composeWithDevTools(middleware)
)
const theme = {
  mainBlue: "#8BAFED",
  mainOrange:"#FF8C00",
  blue:"#CEDFFE",
  orange:"#FEDDCC"
}

ReactDOM.render(
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>,
   document.getElementById('root'))
