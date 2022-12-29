import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// hooks
import useMount from '../../hooks/useMount'

// actions
import { getTagList, getCategoryList } from '@/redux/article/actions'

// components
import SignModal from './SignModal'
// import UploadModal from '@/components/Public/UploadModal'
import { Modal } from 'antd'
import useModal from '../../hooks/useModal'

/**
 * @component Public 公共组件，挂在在 APP.jsx 中，用于存放初始化的组件/方法 或者公用的 modal 等
 */
function PublicComponent(props) {
  const dispatch = useDispatch() // dispatch hooks
  const { modalProps } = useModal()

  useMount(() => {
    dispatch(getTagList())
    // dispatch(getCategoryList())
  })

  return (
    <>
      <SignModal />
      {/* <UploadModal /> */}
      <Modal {...modalProps} title='公告'>
        <h2>本次更新内容：</h2>
        <h6>1.隐藏思考栏目</h6>
        <h6>2.隐藏非管理员写文章入口</h6>
        <h6>3.优化页面UI</h6>
        <h6>4.增加分享帖子回帖功能</h6>
        <h6>5.修复无法发帖BUG</h6>
      </Modal>
    </>
  )
}

export default PublicComponent
