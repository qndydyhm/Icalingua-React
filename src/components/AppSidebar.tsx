import { Search as SearchIcon } from '@mui/icons-material'
import { Avatar, Button, Grid, Input } from '@mui/material'
import { RootState, useAppSelector } from 'app/store'
import React, { useState } from 'react'
import { getUserAvatarUrl } from 'utils/apis'
import styles from './AppSidebar.module.scss'
import SidebarRooms from './SidebarRooms'

export type FolderType = 'All' | 'Friends' | 'Group'

export default function AppSidebar() {
  const [folder, setFolder] = useState<FolderType>('All')
  const [search, setSearch] = useState<string | undefined>(undefined)
  const onlineData = useAppSelector((state: RootState) => state.account.onlineData)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > 0) {
      setSearch(value)
    } else {
      setSearch(undefined)
    }
  }

  return (
    <Grid container item xs={12} md={3} direction="column" wrap="nowrap" className={styles.sidebar}>
      <Grid item className={styles.sidebarHead}>
        <Grid container item className={styles.sidebarTitle}>
          <div className={styles.menuButton}>
            <Avatar src={getUserAvatarUrl(onlineData?.user_id as number)} />
          </div>
          <div className={styles.searchBox}>
            <Input placeholder="Search" className={styles.searchInput} onChange={handleSearch} />
            <SearchIcon className={styles.searchIcon} />
          </div>
        </Grid>

        <Grid item className={styles.foldersTabs}>
          {/* TODO: 支持自定义文件夹 */}
          <Button className={folder === 'All' ? styles.folderActive : ''} onClick={() => setFolder('All')}>
            全部会话
          </Button>
          <Button className={folder === 'Friends' ? styles.folderActive : ''} onClick={() => setFolder('Friends')}>
            好友
          </Button>
          <Button className={folder === 'Group' ? styles.folderActive : ''} onClick={() => setFolder('Group')}>
            群组
          </Button>
        </Grid>
      </Grid>

      <Grid item className={styles.sidebarContent}>
        <SidebarRooms folder={folder} search={search} />
      </Grid>
    </Grid>
  )
}
