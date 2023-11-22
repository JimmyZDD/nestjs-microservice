/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:47
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 11:38:56
 * @FilePath: App.tsx
 */
import { Image, List, NavBar, TabBar } from 'antd-mobile';
import { gql, useQuery } from '@apollo/client';
import { Button, Form, Input } from 'antd-mobile';
import { AppOutline, UserOutline } from 'antd-mobile-icons';
import style from './app.module.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const tabs = [
  {
    key: 'home',
    title: '首页',
    path: '/home',
    icon: <AppOutline />
  },
  {
    key: 'my',
    title: '我的',
    path: '/order',
    icon: <UserOutline />
  }
];

function App() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  useEffect(() => {
    console.warn('token', token);
    if (!token) {
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 100);
    } else if (pathname === '/') {
      navigate('/home', { replace: true });
    }
  });

  return (
    <div className={style.app}>
      <div className={style.nav}>
        <NavBar backArrow={false}></NavBar>
      </div>
      <div className={style.body}>
        <Outlet />
      </div>
      <div className={style.tabBar}>
        <TabBar
          safeArea
          activeKey={pathname}
          onChange={(value) => setRouteActive(value)}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}

export default App;
