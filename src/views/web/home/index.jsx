import React, { useMemo, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import useFetchList from '../../../hooks/useFetchList'
import { Spin, List } from 'antd'
import ArticleCard from '../../../components/ArticleCard'
import Pagination from '../../../components/Pagination'
import './index.less'
import axios from '../../../utils/axios'

const Home = props => {
    const [articleList, setArticleList] = useState([])
    const history = useHistory()
    //  获取文章列表
    const { loading, pagination, dataList } = useFetchList({
        requestUrl: '/article/list',
        queryParams: { current: 1, pageSize: 10 },
        fetchDependence: [props.location.search]
      })

    const list = useMemo(() => {
        return [...dataList].map(item => {
          const index = item.content.indexOf('<!--more-->')
        //   item.content = translateMarkdown(item.content.slice(0, index))
          return item
        })
      }, [dataList])

    const jumpTo = id => {
        history.push(`/article/${id}`)
      }

    return (
        <Spin tip='Loading...' spinning={loading}>
            {/* <div onClick={getTags}>test</div> */}
            <div className='app-home'>
                <div>
                    <List
                        dataSource={list}
                        renderItem={item => (
                        <List.Item onClick={() => jumpTo(item.id)}>
                            <ArticleCard prop={item}></ArticleCard>
                        </List.Item>
                        )}
                    />
                </div>
                
                <div style={{'textAlign': 'right'}}>
                    <Pagination
                    {...pagination}
                    onChange={
                        page => {
                            document.querySelector('.app-main').scrollTop = 0 // turn to the top
                            pagination.onChange(page)
                        }
                    } />
                </div>
                
            </div>
        </Spin>
    )
}

export default Home
