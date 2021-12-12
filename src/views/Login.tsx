import { Button, Container, Grid, TextField } from '@mui/material'
import { getConfig, saveConfig } from 'providers/configProvider'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const requireLogin = getConfig().server === '' || getConfig().privateKey === ''
  const navigate = useNavigate()
  useEffect(() => {
    if (!requireLogin) navigate('/')
  }, [])

  const { register, setValue, getValues } = useForm()

  useEffect(() => {
    setValue('server', getConfig().server)
    setValue('privateKey', getConfig().privateKey)
  }, [])

  const login = async () => {
    saveConfig({ server: getValues('server'), privateKey: getValues('privateKey') })
    navigate('/', { replace: true }) // 不在 history 里留记录，因为不应该留
  }

  return (
    <Container>
      <form onSubmit={login} style={{ margin: '10% auto' }}>
        <Grid container gap={2} justifyContent="center" flexDirection="column">
          <h1 style={{ textAlign: 'center' }}>连接服务器</h1>
          <TextField label="服务器地址" {...register('server')} />
          <TextField label="私钥" {...register('privateKey')} />
          <Button onClick={login} type="submit">
            登录
          </Button>
        </Grid>
      </form>
    </Container>
  )
}
