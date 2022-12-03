import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { loginout } from '../../../redux/user/actions'

import { Button, Dropdown, Menu, Avatar } from 'antd'
// import logo from '@/assets/images/avatar.jpeg'

function AdminHeader(props) {
  const dispatch = useDispatch()
  const history = useHistory()

  const userInfo = useSelector(state => state.user)

  const menu = (
    <Menu className='menu'>
      <Menu.Item key="1">
        <span onClick={e => history.push('/')}>
          返回主页
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span
          onClick={e => {
            dispatch(loginout())
            history.push('/')
          }}>
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <div>
        {/* <img src={logo} alt='pvmed' /> */}
        <span className='header-title'>博客后台管理</span>
        <Dropdown overlay={menu} className='header-dropdown'>
          <a className='ant-dropdown-link'>
            {userInfo.username} 
          </a>
        </Dropdown>
      </div>
    </>
  )
}

export default AdminHeader
