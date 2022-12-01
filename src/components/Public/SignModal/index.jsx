import React, { useState, useEffect } from 'react'
import { Form, Icon, Input, Button, Modal } from 'antd'
import { useLocation } from 'react-router-dom'
import {GithubOutlined} from '@ant-design/icons'

import { GITHUB } from '../../../config'
import { save } from '../../../utils/storage'

// redux
import { login, register } from '../../../redux/user/actions'
import { useDispatch } from 'react-redux'

// hooks
import { useListener } from '../../../hooks/useBus'

const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

function FormItem(props) {
  const { children, ...rest } = props
  return <Form.Item {...FormItemLayout} {...rest}>{children}</Form.Item>
}

function SignModal(props) {
  const dispatch = useDispatch() // dispatch hooks
  const location = useLocation() // location
  const [open, setVisible] = useState(false)
  const [type, setType] = useState('login')
  // const { getFieldDecorator } = props.form

  useListener('openSignModal', type => {
    // props.form.resetFields()
    setType(type)
    setVisible(true)
  })

  function handleSubmit(values) {
    console.log(values)
    const action = type === 'login' ? login : register
    dispatch(action(values)).then(() => {
      setVisible(false) // type =  login | register
    })
  }

  function githubLogin() {
    const { pathname, search } = location
    save('prevRouter', `${pathname}${search}`)
    window.location.href = `${GITHUB.url}?client_id=${GITHUB.client_id}`
  }

  return (
    <Modal
      width={460}
      title={type}
      open={open}
      onCancel={e => setVisible(false)}
      footer={null}>
      <Form layout='horizontal' onFinish={handleSubmit}>
        {type === 'login' ? (
          <>
            <Form.Item label='用户名' name="account" rules={[{ required: true, message: 'Username is required' }]}>
              <Input placeholder='请输入用户名'/>
            </Form.Item>
            <Form.Item label='密码' name="password" rules={[{ required: true, message: 'Password is required' }]}>
              <Input placeholder='请输入密码'/>
            </Form.Item>

          </>
        )
          : (
            <>
              <Form.Item label='用户名' name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder='请输入用户名'/>
              </Form.Item>
              <Form.Item label='密码' name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder='请输入密码'/>
              </Form.Item>
              <Form.Item label='确认密码' name="confirm" rules={[{ required: true, message: '请确认密码' }, 
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码输入不一致!'));
                  },
                }),
              ]}>
                <Input placeholder='确认密码'/>
              </Form.Item>
              <Form.Item label='邮箱' name="email" rules={[{ type: 'email', message: '不是一个有效的邮箱!' }, { required: true, message: '请输入邮箱!' }]}>
                <Input placeholder='请输入您的邮箱'/>
              </Form.Item>

            </>
          )}
          <Form.Item>
            <Button type='primary' block htmlType="submit">
              {type}
            </Button>
          </Form.Item>
      </Form>
      
      {GITHUB.enable && (
        <Button block icon={<GithubOutlined />} onClick={githubLogin} style={{ marginTop: 10 }}>
          github login
        </Button>
      )}
    </Modal>
  )
}

export default SignModal
