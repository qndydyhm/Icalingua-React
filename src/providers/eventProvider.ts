import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import Emitter from 'component-emitter'
import { logger, newLogProps } from '../utils/logger'
import { Bridge } from './bridgeProvider'

const ui = new Emitter
const account = new Emitter
const rooms = new Emitter
const messages = new Emitter

export const events = {
  ui, account, rooms, messages,
}

// Attach Events
account.on('loginSuccess', (bot: Bridge) => {
  // console.log(bot)
  logger.success(newLogProps(`用户 ${bot.nickname}(${bot.uin}) 登录成功`))
})

account.on('loginFailed', () => {
  location.href = '/login'
})

// Logger
ui.on('showMessage', (args: ArgsProps) => {
  notification.info({ ...args })
})

ui.on('showSuccess', (args: ArgsProps) => {
  notification.success({ ...args })
})

ui.on('showWarning', (args: ArgsProps) => {
  notification.warn({ ...args })
  logger.warning({ ...args })
})

ui.on('showError', (args: ArgsProps) => {
  notification.error({ ...args })
  logger.error({ ...args })
})

