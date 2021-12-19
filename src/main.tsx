import { store } from 'app/store'
import { SnackbarProvider } from 'notistack'
import { initLocalStorage } from 'providers/configProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from './routers'
import './styles/global.css'

// 初始化数据
initLocalStorage()

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <Router />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
