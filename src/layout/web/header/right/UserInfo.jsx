import React, { Component } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

// methods
import { loginout } from '../../../../redux/user/actions'

// components
import { Button, Dropdown, Menu, Avatar } from 'antd'
import AppAvatar from '../../../../components/Avatar'

// hooks
import useBus from '../../../../hooks/useBus'

function UserInfo(props) {
  const dispatch = useDispatch()
  const bus = useBus()
  const userInfo = useSelector(state => state.user)
  const { username, github, role } = userInfo
  
  const writeArticle = () => {

  }

  const MenuOverLay = (
    <Menu>
      <Menu.Item key="1">
        <span className='user-logout' onClick={writeArticle}>
          写文章
        </span>
      </Menu.Item>
      {role === 1 && (
        <Menu.Item key="2">
          <span onClick={e => bus.emit('openUploadModal')}>导入文章</span>
        </Menu.Item>
      )}
      {role === 1 && (
        <Menu.Item key="3">
          <span onClick={e => props.history.push('/admin')}>后台管理</span>
        </Menu.Item>
      )}

      <Menu.Item key="4">
        <span className='user-logout' onClick={e => dispatch(loginout())}>
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className='header-userInfo'>
      {username ? (
        <Dropdown placement='bottom' overlay={MenuOverLay}>
          <div style={{ height: 55 }}>
            <AppAvatar userInfo={userInfo} popoverVisible={false} />
          </div>
        </Dropdown>
      )
        : (
          <>
            <Button
              ghost
              type='primary'
              size='small'
              style={{ marginRight: 20 }}
              onClick={e => bus.emit('openSignModal', 'login')}
            >
              登录
            </Button>
            <Button ghost type='danger' size='small' 
            onClick={e => bus.emit('openSignModal', 'register')}
            >
              注册
            </Button>
          </>
        )}
    </div>
  )
}

export default withRouter(UserInfo)
