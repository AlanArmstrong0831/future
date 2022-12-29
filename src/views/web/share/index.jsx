import React, { useState, useEffect } from 'react'
import './index.less'
import { useMediaQuery } from 'react-responsive'
import { Link, useHistory } from 'react-router-dom'
import { Divider, Spin, Input, Button, Form, message } from 'antd'
import { connect, useSelector } from 'react-redux'
import axios from '../../../utils/axios'
import useAjaxLoading from '../../../hooks/useAjaxLoading'
import Floor from '../../../components/Floor'
import UserinfoInShare from '../../../components/UserinfoInShare'
import dayjs from '../../../utils/dayjs'
import AppAvatar from '../../../components/Avatar'
import {EditOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';

/**
 * 帖子内容
*/

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} placeholder='说点什么...' onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <div className='controls'>
        <Button className='disscus-btn' htmlType='submit' onClick={onSubmit} type='primary'>
          回复
        </Button>
      </div>
    </Form.Item>
  </div>
)

function Share(props) {
  const history = useHistory()
  const userInfo = useSelector(state => state.user)
  const [loading, withLoading] = useAjaxLoading()
  const isFoldNavigation = useMediaQuery({ query: '(max-width: 1300px)' })
  const [floors, setFloor] = useState([])
  const [value, setValue] = useState('')
  const [authorInfo, setInfo] = useState({
    createAt: '',
    content: '',
    user: {
        username: '1'
    },
  })

  const shareId = parseInt(props.match.params.id)

  useEffect(() => {
    withLoading(axios.get(`/share/${shareId}`))
      .then(res => {
        res.floors.map((item, index) => item.number = index + 1)
        setFloor(res.floors)
        setInfo({...res})
      })
      .catch(e => {
        props.history.push('/404')
      })
  }, [props.match.params.id])

  const handleSubmit = () => {
    if (!value) return message.warning('内容不能为空！')
    axios
      .post('/share/createReply', {
        shareId,
        content: value,
        userId: userInfo.userId
      })
      .then(res => {
        setFloor(res.floors)
        setValue('')
        message.success('发表成功！')
      })
  }

  return (
      <Spin tip='Loading...' spinning={loading}>
        <div className='mainBox'>
          <div className='floor-title'>
            <span>{authorInfo.title}</span>
          </div>
          <div className='floor-main'>
              <div className='floor-userinfo'>
                  <UserinfoInShare info={authorInfo.user}></UserinfoInShare>
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

          <div className='reply'>
            <Editor
              onChange={e => setValue(e.target.value)}
              onSubmit={handleSubmit}
              value={value}
            />
          </div>
        </div>     
      </Spin>
  )
}

export default Share
