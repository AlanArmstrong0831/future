import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import './index.less'
import axios from '../../../utils/axios'
import { Button, Input, Modal, message } from 'antd'
import { EditOutlined, FileAddOutlined } from '@ant-design/icons';
import MdEditor from '../../../components/MdEditor'

function WriteShare(props) {

  const userInfo = useSelector(state => state.user)

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    
  }, [])

  function add() {
    if (!title) return message.warning('标题不能为空！')
    axios
      .post('/share', {
        title,
        content,
        userId: userInfo.userId
      })
      .then(res => {
        Modal.confirm({
          title: '发帖成功！是否立即查看？',
          onOk: () => props.history.push(`/share/${res.id}`)
        })
      })
  }

  return (
    <div className='admin-edit-article'>
      <ul className='form-list'>
        <li>
          <span className='label'>标题：</span>
          <span style={{ flex: 1 }}>
            <Input
              placeholder='请输入文章标题'
              className='title-input'
              name='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </span>
        </li>
      </ul>
      <MdEditor value={content} onChange={setContent} />
      <Button
        type='primary'
        size='large'
        disabled={!title}
        className='action-icon'
        onClick={add}
      >完成</Button>
    </div>
  )
}

export default WriteShare
