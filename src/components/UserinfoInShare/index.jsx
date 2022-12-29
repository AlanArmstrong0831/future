import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Divider, Tag } from 'antd'
import AppAvatar from '../Avatar'


import './index.less'
/**
 * 帖子内用户信息
*/
function UserinfoInShare(props) {
  const history = useHistory()

  useEffect(()=>{
    // console.log(props)
  },[{...props.info}])


  return (
    <div className='rank-main'>
        <div className='user-avatar'><AppAvatar style={{width: '60%'}} userInfo={props.info} /></div>
        <div className='user-info'>{props.info.username}</div>
        <div className='user-level'>初出茅庐</div>
    </div>   
  )
}

export default UserinfoInShare
