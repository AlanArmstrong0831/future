import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Divider, Tag } from 'antd'
import AppAvatar from '../Avatar'
import dayjs from '../../utils/dayjs'
import { EyeOutlined, TagOutlined, CommentOutlined } from '@ant-design/icons';

import './index.less'
/**
 * 帖子内楼层
*/
function Floor(props) {
  const history = useHistory()

  useEffect(()=>{
    console.log(props)
  },[])


  return (
    <div className='floor-main'>
        <div className='floor-userinfo'>
            <div className='user-avatar'><AppAvatar style={{width: '60%'}} userInfo={props.prop.user} /></div>
            <div className='user-info'>{props.prop.user.username}</div>
        </div>
        <div className='floor-content'>
            <span>{props.prop.content}</span>
            <div className='floor-info'>
                <span> 1楼 &nbsp;&nbsp;</span>
                <span>{dayjs(props.prop.createdAt).fromNow()}</span>
            </div>
            
        </div>
    </div>   
  )
}

export default Floor
