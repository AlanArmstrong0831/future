import React, { useState } from 'react'
import { Dropdown, Menu, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import {
  SearchOutlined
} from '@ant-design/icons';

// import config
import { HEADER_BLOG_NAME } from '../../../../config'
import navList from '../right/navList'

const HeaderLeft = props => {
  const [keyword, setKeyword] = useState('')
  const history = useHistory()

  function handleChange(e) {
    e.preventDefault()
    setKeyword(e.target.value)
  }

  function onPressEnter(e) {
    e.target.blur()
  }

  function onSubmit() {
    history.push(`/?page=1&keyword=${keyword}`)
    setKeyword('')
  }

  function clickSearch(e) {
    e.stopPropagation()
  }

  const menu = (
    <Menu className='header-nav'>
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <SearchOutlined type={nav.icon} style={{ marginRight: 15 }} />}
            {/* {nav.icon && <Icon type={nav.icon} style={{ marginRight: 15 }} />} */}
            <span className='nav-text'>{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item key={'search'}>
        {/* <Icon type='search' /> */}
        <SearchOutlined />
        <Input
          className='search-input'
          onClick={clickSearch}
          value={keyword}
          onChange={handleChange}
          onPressEnter={onPressEnter}
          onBlur={onSubmit}
        />
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='header-left'>
      <span className='blog-name'>{HEADER_BLOG_NAME}</span>
    </div>
  )
}

export default HeaderLeft
