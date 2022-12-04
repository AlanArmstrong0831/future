import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import useFetchList from '../../../hooks/useFetchList'

import './index.less'


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Minions = (props) => {

  const { loading, pagination, dataList } = useFetchList({
    requestUrl: '/article/list',
    queryParams: { current: 1, pageSize: 10 },
    fetchDependence: [props.location.search]
  })

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">编辑</a>, <a key="list-loadmore-more">删除</a>]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={(<div className={item.content.length > 100 ? 'ellipsis' : ''}>{item.content}</div>)}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Minions
