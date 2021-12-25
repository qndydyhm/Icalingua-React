import { Snackbar } from '@mui/material'
import { getMessages } from 'adapters/room'
import { addMessage, putMessages } from 'app/features/room/roomSlices'
import { RootState, useAppDispatch, useAppSelector } from 'app/store'
import { events } from 'providers/eventProvider'
import { useEffect, useRef } from 'react'
import { Message, Room } from 'types/RoomTypes'
import styles from './ChatRoom.module.scss'
import ChatBubble from './ChatRoom/ChatBubble'
import ChatInput from './ChatRoom/ChatInput'

export default function ChatRoom() {
  const dispatch = useAppDispatch()
  const bottomElem = useRef<HTMLDivElement>(null)
  const room = useAppSelector((state: RootState) => state.ui.room) as Room
  const messages = useAppSelector((state: RootState) => state.room.messages) as Message[]

  const scrollToButton = () => {
    bottomElem.current?.scrollIntoView({ behavior: 'auto' })
  }

  const attachEvents = () => {
    events.messages.on('addMessage', (roomId: number, message: Message) => {
      if (roomId === room.roomId) {
        dispatch(addMessage(message))
        scrollToButton()
      }
    })
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(room.roomId as number)
      dispatch(putMessages(messages))

      scrollToButton() // 滚动到底部
    }

    // 获取房间信息
    fetchMessages().then(
      () => attachEvents(), // 获取房间事件
    )

    return () => {
      events.messages.off('addMessage') // 关闭消息监听
    }
  }, [room.roomId])

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={messages.length === 0}
        message="正在加载聊天记录..."
      />

      <div className={styles.chatTopBar}>
        <span className={styles.chatTopBarAvatar}>
          <img src={room.avatar} alt="avatar" />
        </span>
        <span className={styles.chatTopBarTitle}>{room.roomName}</span>
      </div>

      <div className={styles.chatBubbles}>
        {messages?.map((i: Message) => {
          return <ChatBubble key={i._id} message={i} />
        })}
      </div>

      <div id="bottom" ref={bottomElem} />

      <ChatInput roomId={room.roomId} />
    </>
  )
}
