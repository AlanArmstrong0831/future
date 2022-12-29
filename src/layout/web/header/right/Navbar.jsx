import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import {
  ReadOutlined
} from '@ant-design/icons';
import navList from './navList'

function NavBar(props) {
  const location = useLocation()
  const { mode = 'horizontal' } = props
  return (
    <Menu mode={mode} selectedKeys={[location.pathname]} className='header-nav'>
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <ReadOutlined type={nav.icon} style={{ marginRight: 15 }} />}
            <span className='nav-text'>{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default NavBar
