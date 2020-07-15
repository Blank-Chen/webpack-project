import React, { useState, useEffect } from 'react'
import { Progress } from 'antd'

function Loading () {
  let [percent, setPercent] = useState(10)
  let [status, setStatus] = useState('active')
  let timer = null
  useEffect(() => {
    function updateLoading () {
      if (percent < 100) {
        setPercent(percent++)
      }
      if (percent > 85) {
        clearTimeout(timer)
        timer = null
        return
      }
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(updateLoading, 60)
    }
    updateLoading()
    return () => {
      setPercent(100)
      setStatus('success')
      clearTimeout(timer)
      timer = null
    }
  })
  return <Progress percent={percent} size="small" status={status} className="common-loading-progress" />
}
export default Loading