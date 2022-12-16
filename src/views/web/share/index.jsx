import React, { useState, useEffect } from 'react'
import './index.less'
import { useMediaQuery } from 'react-responsive'
import { Link, useHistory } from 'react-router-dom'
import { Divider, Spin, List } from 'antd'
import axios from '../../../utils/axios'
import useAjaxLoading from '../../../hooks/useAjaxLoading'
import Floor from '../../../components/Floor'
import dayjs from '../../../utils/dayjs'
import AppAvatar from '../../../components/Avatar'
import {EditOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';

/**
 * 帖子内容
*/
function Share(props) {
  const history = useHistory()
  const [loading, withLoading] = useAjaxLoading()
  const isFoldNavigation = useMediaQuery({ query: '(max-width: 1300px)' })
  const [floors, setFloor] = useState([])
  const [authorInfo, setInfo] = useState({
    createAt: '',
    content: '',
    user: {
        username: ''
    },
  })

  const shareId = parseInt(props.match.params.id)

  useEffect(() => {
    withLoading(axios.get(`/share/${shareId}`))
      .then(res => {
        setFloor(res.floors)
        setInfo({...res})
      })
      .catch(e => {
        props.history.push('/404')
      })
  }, [props.match.params.id])


  return (
      <Spin tip='Loading...' spinning={loading}>
        <div className='floor-main'>
            <div className='floor-userinfo'>
                <div className='user-avatar'><AppAvatar style={{width: '60%'}} userInfo={authorInfo.user} /></div>
                <div className='user-info'>{authorInfo.user.username}</div>
            </div>
            <div className='floor-content'>
                <span>{authorInfo.content}</span>
                <div className='floor-info'>
                    <span>{dayjs(authorInfo.createdAt).fromNow()}</span>
                </div>
                
            </div>
        </div>  
        {
            floors.map((item => {
                return (<Floor prop={item} key={item.id}></Floor>)
            }))
        }
      </Spin>
  )
}

export default Share
