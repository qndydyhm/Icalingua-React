import { Grid } from '@mui/material'
import { updateOnlineData, updateRooms, updateRoomsSingle } from 'app/features/account/accountSlices'
import { useAppDispatch } from 'app/store'
import AppContainer from 'components/AppContainer'
import AppSidebar from 'components/AppSidebar'
import { PageLoading } from 'components/Loading'
import { Bridge, createBridge } from 'providers/bridgeProvider'
import { getConfig } from 'providers/configProvider'
import { events } from 'providers/eventProvider'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Room } from 'types/RoomTypes'
import { OnlineData } from 'types/RuntimeTypes'

export default function App() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const initSubscribe = () => {
    // 监听 OnlineData
    events.account.on('updateOnlineData', async (bot: Bridge) => {
      dispatch(updateOnlineData(bot.onlineData as OnlineData))
      setLoading(false)
    })

    // 监听房间列表
    events.rooms.on('updateRooms', (rooms: Room[]) => {
      dispatch(updateRooms(rooms))
    })

    // 监听房间更新事件
    events.rooms.on('updateRoom', (room: Room) => {
      dispatch(updateRoomsSingle(room))
    })
  }

  const navigate = useNavigate()

  useEffect(() => {
    // 判断是否完成登录
    const requireLogin = getConfig().server === '' || getConfig().privateKey === ''
    // 在这里检查配置是否完成，若未完成则不初始化 bridge
    if (requireLogin) return navigate('/login', { replace: true })

    // 初始化 bridge
    createBridge()

    // 监听 bridge 的事件
    initSubscribe()

    // 关闭事件监听
    return () => {
      events.account.off('updateOnlineData')
      events.rooms.off('updateRooms')
      events.rooms.off('updateRoom')
    }
  }, [])

  return (
    <Grid container style={{ height: '100%' }}>
      {loading ? (
        <PageLoading />
      ) : (
        <>
          <AppSidebar />
          <AppContainer />
        </>
      )}
    </Grid>
  )
}
