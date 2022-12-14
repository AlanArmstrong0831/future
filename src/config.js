import React from 'react'
// import { Icon } from 'antd'
import {GithubOutlined} from '@ant-design/icons';

import Href from './components/Href'
// import MyInfo from '@/views/web/about/MyInfo'

// API_BASE_URL
// export const API_BASE_URL = 'http://106.15.205.230:6061'
export const API_BASE_URL = 'http://localhost:6061'

// project config
export const HEADER_BLOG_NAME = '309车管所' // header title 显示的名字

// === sidebar
export const SIDEBAR = {
  avatar: require('@/assets/images/avatar.jpeg'), // 侧边栏头像
  title: 'Alan', // 标题
  subTitle: '学而知不足', // 子标题
  // 个人主页
  homepages: {
    github: {
      link: 'https://github.com/alvin0216',
      // icon: <Icon type='github' theme='filled' className='homepage-icon' />
      icon: <GithubOutlined />
    },
    juejin: {
      link: 'https://juejin.im/user/5acac6c4f265da2378408f92',
      icon: <GithubOutlined />
    }
  }
}

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar // 评论框博主头像

/**
 * github config
 */
export const GITHUB = {
  enable: true, // github 第三方授权开关
  client_id: 'c6a96a84105bb0be1fe5', // Setting > Developer setting > OAuth applications => client_id
  url: 'https://github.com/login/oauth/authorize' // 跳转的登录的地址
}

// export const ABOUT = {
//   avatar: SIDEBAR.avatar,
//   describe: SIDEBAR.subTitle,
//   discuss: true, // 关于页面是否开启讨论
//   renderMyInfo: <MyInfo /> // 我的介绍 自定义组件 => src/views/web/about/MyInfo.jsx
// }

// 公告 announcement
export const ANNOUNCEMENT = {
  enable: true, // 是否开启
  content: (
    <>
      个人笔记网站，请访问
      <Href href='www.baidu.com'> alan's note</Href>
    </>
  )
}
