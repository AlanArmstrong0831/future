import React, { useState, useEffect } from 'react'
import './index.less'
import { useMediaQuery } from 'react-responsive'
import { Link, useHistory } from 'react-router-dom'
import { Divider, Spin, List } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../../utils/axios'
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import useFetchList from '../../../hooks/useFetchList'
import AppAvatar from '../../../components/Avatar'

const Description = ({ content, floors, author }) => {
  let update = floors.length && floors[floors.length - 1].createdAt || '暂无'
  return (
    <div>
      <span style={{fontSize: '16px'}}>{content}</span>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span><FieldTimeOutlined />{`${update}更新`}</span>
        <span><UserOutlined />{`车主：${author.username}`}</span>
      </div>   
    </div>
  )
}

/**
 * 分享专楼
*/
function ShareHome(props) {
  const history = useHistory()
  const isFoldNavigation = useMediaQuery({ query: '(max-width: 1300px)' })
  const userInfo = useSelector(state => state.user)
 
  const { loading, pagination, dataList } = useFetchList({
    requestUrl: '/share/list',
    queryParams: { current: 1, pageSize: 10 },
    fetchDependence: [props.location.search]
  })

  const jumpTo = id => {
    history.push(`/share/${id}`)
  }
  const jumpToWrite = () => {
    console.log('jump')
    history.push('/writeShare')
  }

  return (
      <Spin tip='Loading...' spinning={loading}>
        <div className='share-content'>
            <div className='left-flex'><div className='share-btn' onClick={jumpToWrite}>发帖</div></div>        
            <List
                itemLayout="horizontal"
                dataSource={dataList}
                renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        key={item.id}
                        avatar={<AppAvatar userInfo={item.user} />}
                        title={<a onClick={() => jumpTo(item.id)}>{item.title}</a>}
                        description={<Description content={item.content} floors={item.floors} author={item.user}/>}
                    />
                </List.Item>
                )}
            />
        </div>
      </Spin>
  )
}

export default ShareHome
