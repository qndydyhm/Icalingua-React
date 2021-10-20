import { configureStore } from '@reduxjs/toolkit'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { reducer } from './data/reducer'
import { initLocalStorage } from './providers/configProvider'
import Router from './routers'
import './styles/global.scss'

moment('zh-cn')

// 初始化数据
initLocalStorage()

const store = configureStore({
  reducer: reducer
})

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
