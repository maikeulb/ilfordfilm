import React, { Component } from 'react';

import Aux from './Aux';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';

const { Header, Content, Footer, Sider } = Layout;

const Trigger = styled.div`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
}
`;

const Logo = styled.div`
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
  padding: 0 10px;
  font-weight: bold;
`;

class AppLayout extends Component {

  state = {
    collapsed: true,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    return (
      <Aux>
        <Layout>

          <Sider
            trigger={null}
            collapsedWidth="0"
            breakpoint="md"
            width="140"
            collapsible
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            collapsed={this.state.collapsed}>
            <Logo>
              ILFORD FILM
            </Logo>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
            </Menu>
          </Sider>

        <Layout style={{height:"100vh"}}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Trigger>
                <Icon
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}/>
                </Trigger>
            </Header>
            <Content style={{ textAlign: 'center' }}>
              <main>
                {this.props.children}
              </main>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              ©2018
            </Footer>
          </Layout>
        </Layout>
      </Aux>
    )
  }
}

export default AppLayout;
