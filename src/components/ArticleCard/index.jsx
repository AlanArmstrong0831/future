import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { Card, Divider, Tag } from 'antd'
import { EyeOutlined, TagOutlined, CommentOutlined } from '@ant-design/icons';
import { calcCommentsCount } from '../../utils'
import './index.less'
/**
 * 文章卡片
*/
function ArticleCard(props) {
  const history = useHistory()
  const [list, setList] = useState([])
  useEffect(()=>{
    // console.log(props)
  },[])


  return (
    <Card style={{ margin: '16px 0' }}>
      <div className='card-main'>
        <div className='card-title'>{props.prop.title}</div>
        <Divider></Divider>
        <div className='card-content'>{props.prop.content}</div>
        <Divider></Divider>
        <div className='card-footer'>
          <div className='viewCount'>
            <EyeOutlined style={{ marginRight: 7 }}/>
            {props.prop.viewCount}
            <CommentOutlined style={{ marginLeft: 7, marginRight: 7 }}/>
            <span> {calcCommentsCount(props.prop.comments)}</span>

          </div>
          <Divider type='vertical' style={{ marginRight: 7 }} />
          <div className='viewCount'>
            <TagOutlined style={{ marginRight: 7 }}/>
            {props.prop.tags.map((item) => {
              return (<Tag color="#2db7f5" key={item.name}>{item.name}</Tag>)
            })}
          </div>
          <Divider type='vertical' style={{ marginRight: 7 }} />
          <div className='createAt'>{'发布时间：' + props.prop.createdAt}</div>    
        </div>
      </div>
    </Card>
  )
}

export default ArticleCard
