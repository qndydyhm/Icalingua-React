import { Grid } from '@mui/material'
import { joinRoom } from 'app/features/ui/uiSlices'
import { RootState, useAppDispatch, useAppSelector } from 'app/store'
import React from 'react'
import ChatRoom from './ChatRoom'

export default function AppContainer() {
  const onlineData = useAppSelector((state: RootState) => state.account.onlineData)
  const room = useAppSelector((state: RootState) => state.ui.room)
  const dispatch = useAppDispatch()

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      dispatch(joinRoom(null))
    }
  }

  return (
    <Grid item xs={12} md={9} tabIndex={-1} style={{ maxHeight: '100%', overflow: 'hidden' }} onKeyUp={handleKeyUp}>
      {room ? (
        <ChatRoom />
      ) : (
        <div style={{ padding: 8 }}>
          <p>Icalingua-React 1.0</p>

          <p>
            {onlineData?.sysInfo?.split('\n').map((i: string) => (
              <span key={i} style={{ display: 'block' }}>
                {i}
              </span>
            ))}
          </p>
        </div>
      )}
    </Grid>
  )
}
