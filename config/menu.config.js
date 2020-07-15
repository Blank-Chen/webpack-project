/**
 * @desc common menu config of sider
 * @author pika
 */

import React from 'react'
import {
  LinkOutlined
} from '@ant-design/icons';

export default [{
  title: 'Home',
  path: '/',
  icon: <LinkOutlined />
},
{
  title: 'Menu',
  icon: <LinkOutlined />,
  permit: '',
  list: [
    {
      title: 'Table',
      path: '/league',
      icon: <LinkOutlined />,
      permit: ''
    },
    {
      title: 'Column',
      path: '/organize',
      icon: <LinkOutlined />,
      permit: '',
    },
  ]
}
]