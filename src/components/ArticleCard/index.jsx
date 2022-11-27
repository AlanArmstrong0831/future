import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { Card, Divider } from 'antd'
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
          <div className='viewCount'>{'点赞数：' + props.prop.viewCount}</div>
          <div className='createAt'>{'发布时间：' + props.prop.createdAt}</div>    
        </div>
      </div>
    </Card>
  )
}

export default ArticleCard
