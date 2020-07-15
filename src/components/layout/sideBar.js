import React, { useState, useEffect } from 'react'
import { Menu, Layout } from 'antd'
import { createGUID } from '@/utils/tool'
import { connect } from 'dva'
import { Link } from 'dva/router'
import menuConfig from 'config/menu.config';
import './style.scss'

const { SubMenu } = Menu;
const { Sider } = Layout;
const MenuItem = Menu.Item
const menuList = parseMenu(menuConfig)

/**
 * @parse menu and add key
 * @param {Array} menus all menus in menu.config
 * @param {Number} menus 
 */
function parseMenu (menus, pId = 0) {
  return menus.map(menu => {
    const stack = { ...menu, key: createGUID(), pId };
    if (Array.isArray(menu.list)) {
      stack.list = parseMenu(menu.list, stack.key);
    }
    return stack;
  });
}

/**
 * @desc loop and render menu
 * @author pika
 * @return {ReactNode} 
 */
function renderMenu (menus) {
  return menus.map(menu => menu.list ? <SubMenu title={menu.title} icon={menu.icon} key={menu.key} className="sub-menu-item">
    {renderMenu(menu.list)}
  </SubMenu> : <MenuItem key={menu.key}>
      <Link to={menu.path} className="menu-item">
        {menu.icon}
        <span>{menu.title}</span>
      </Link>
    </MenuItem>)
}

/**
 * @desc init default menu selected keys
 * @param {Array} menus menu list 
 */
function initMenuKeys (menus, props) {
  let selectKeys = []
  let openKeys = []
  const { system: { routes } } = props
  function loopToFindKeys (list) {
    for (const menu of list) {
      const find = routes.some(route => route.path === menu.path)
      if (find) {
        openKeys = getOpenKeysByPid(menu.pId)
        selectKeys.push(menu.key)
      } else if (Array.isArray(menu.list)) {
        loopToFindKeys(menu.list)
      }
    }
  }
  loopToFindKeys(menus)
  return { selectKeys, openKeys }
}

/**
 * @desc get menu default open keys by pId of selectkey
 * @param {String} pId value of parentTree
 */
function getOpenKeysByPid (pId) {
  let keys = []
  function loopToFindKeys (menus) {
    for (const menu of menus) {
      if (menu.key === pId) {
        keys.push(menu.key)
        getOpenKeysByPid(menu.pId)
      } else if (Array.isArray(menu.list)) {
        loopToFindKeys(menu.list)
      }
    }
  }
  loopToFindKeys(menuList)
  return keys.reverse()
}


function SideBar (props) {
  const [collapsed, onCollapse] = useState(false)
  const [selectedKeys, setSelectKeys] = useState([])
  const [openedKeys, setOpenKeys] = useState([])
  const initProps = {
    selectedKeys,
    openKeys: openedKeys,
    onOpenChange: keys => setOpenKeys(keys),
    onClick: e => { setSelectKeys(e.key); setOpenKeys(e.keyPath.slice(1)) }
  }
  !openedKeys.length && (delete initProps['openKeys']) // eslint-disable-line

  useEffect(() => {
    // set default select key of menu
    if (!selectedKeys.length) {
      const { selectKeys, openKeys } = initMenuKeys(menuList, props)
      setSelectKeys(selectKeys)
      setOpenKeys(openKeys)
    }
  })

  return <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(!collapsed)} className="common-sider-container">
    <div className="logo"></div>
    <Menu mode='inline' theme='dark' {...initProps}>
      {
        renderMenu(menuList)
      }
    </Menu>
  </Sider>
}

export default connect(({ system }) => ({
  system: system.toJS()
}), null)(SideBar)