import { useStore } from 'react-redux'
import { RootState } from '../../../app/store'
import { Message } from '../../../types/RoomTypes'
import { getUserAvatarUrl } from '../../../utils/apis'
import { randomUsernameColor } from '../../../utils/tools'
import styles from './bubble.module.scss'

export default function ChatBubble({ message }: { message: Message }) {
  // TODO: 进入房间每个人获取一个颜色
  const states: RootState = useStore().getState()

  // 兼容Bridge：把You换成nickname
  let username = message.username
  if (message.senderId === states.onlineData?.uin) {
    username = states.onlineData?.nick as string
  }

  return (
    <div className={styles.bubble}>
      <span>
        <img className={styles.userAvatar} src={getUserAvatarUrl(message.senderId as number)} alt="avatar" />
      </span>
      <div className={styles.message}>
        <span className={styles.username} style={{ color: randomUsernameColor() }}>
          {username}
        </span>
        <p className={styles.content}>{message.content}</p>
        <span className={styles.timestamp}>{message.timestamp}</span>
      </div>
    </div>
  )
}
