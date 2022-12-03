import React, { useState, useEffect } from 'react'
import './index.less'
import useAjaxLoading from '../../../hooks/useAjaxLoading'
import { useMediaQuery } from 'react-responsive'
import { Link, useHistory } from 'react-router-dom'
import { Divider, Spin } from 'antd'
import Discuss from '../../../components/Discuss'
import {calcCommentsCount} from '../../../utils'
import axios from '../../../utils/axios'
import {EditOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';

/**
 * 文章内容
*/
function Article(props) {
  const history = useHistory()
  const [loading, withLoading] = useAjaxLoading()
  const isFoldNavigation = useMediaQuery({ query: '(max-width: 1300px)' })
  const [article, setArticle] = useState({
    title: '',
    content: '',
    tags: [],
    categories: [],
    comments: [],
    createdAt: '',
    viewCount: 0
  })
  const { title, content, tags, categories, comments, createdAt, viewCount } = article
  const articleId = parseInt(props.match.params.id)

  useEffect(() => {
    withLoading(axios.get(`/article/${props.match.params.id}`))
      .then(res => {
        // res.content = translateMarkdown(res.content)
        setArticle(res)
      })
      .catch(e => {
        props.history.push('/404')
      })
  }, [props.match.params.id])

  function setCommentList(list) {
    setArticle({ ...article, comments: list })
  }

  return (
      <Spin tip='Loading...' spinning={loading}>
        <article className='app-article' style={{ paddingRight: isFoldNavigation ? 0 : 275 }}>
          <div className='post-header'>
            <h1 className='post-title'>{title}</h1>

            <div className='article-desc'>
              <span className='post-time'>
                <EditOutlined />
                &nbsp; 发布于： &nbsp;
                <span>{createdAt.slice(0, 10)}</span>
              </span>
              {/* <ArticleTag tagList={tags} categoryList={categories} /> */}
              <Divider type='vertical' />
              <a className='comment-count' href='#discuss' style={{ color: 'inherit' }}>
                <CommentOutlined />
                <span style={{ marginRight: 5 }}> {calcCommentsCount(comments)}</span>
              </a>
              <EyeOutlined style={{ marginRight: 2 }}/>
              <span>{viewCount}</span>
            </div>
          </div>

          <div className='article-detail' dangerouslySetInnerHTML={{ __html: content }} />

          <Discuss articleId={articleId} commentList={comments} setCommentList={setCommentList}/>
        </article>
        
        
      </Spin>
  )
}

export default Article
