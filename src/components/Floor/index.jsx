import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Divider, Tag } from 'antd'
import AppAvatar from '../Avatar'
import dayjs from '../../utils/dayjs'
import UserinfoInShare from '../UserinfoInShare'
import { EyeOutlined, TagOutlined, CommentOutlined } from '@ant-design/icons';

import './index.less'
/**
 * 帖子内楼层
*/
function Floor(props) {
  const history = useHistory()

  useEffect(()=>{
    // console.log(props)
  },[])


  return (
    <div className='floor-main'>
        <div className='floor-userinfo'>
          <UserinfoInShare info={props.prop.user}></UserinfoInShare>
        </div>
        <div className='floor-content'>
            <span>{props.prop.content}</span>
            <div className='floor-info'>
                <span> {`${props.prop.number}楼`} &nbsp;&nbsp;</span>
                <span>{dayjs(props.prop.createdAt).fromNow()}</span>
            </div>
            
        </div>
    </div>   
  )
}

export default Floor
