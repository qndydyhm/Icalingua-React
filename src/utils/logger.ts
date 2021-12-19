import { LogProps } from 'types/RuntimeTypes'

export const logger = (log: LogProps | string) => {
  if (typeof log === 'object') {
    console.log(`[${log.level}] ${log.message}`)
  } else {
    console.log('[Debug] ' + log)
  }
}
