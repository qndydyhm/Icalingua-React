import { OutlinedInput, Button } from '@mui/material'
import { sendMessage } from 'adapters/room'
import React, { useRef } from 'react'
import styles from './input.module.scss'

export default function ChatInput({ roomId }: { roomId: number }) {
  const input = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (input.current?.value.length) {
      sendMessage({ roomId: roomId, content: input.current.value, at: [] })
    }
    input.current.value = ''
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
    return false
  }

  return (
    <div className={styles.chatInputField}>
      <div className={styles.chatInputContainer}>
        <OutlinedInput
          className={styles.chatInput}
          placeholder="请输入消息"
          fullWidth
          onKeyPress={handleKeyPress}
          inputRef={input}
        />
      </div>
      <Button variant="outlined" onClick={handleSubmit}>
        发送
      </Button>
    </div>
  )
}
