import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './Aux';
import { Layout as AntLayout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import logo from '../assets/logo.jpg';

const { Header, Content, Footer, Sider } = AntLayout;

const Trigger = styled.div`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
}
`;

const Logo = styled.div`
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
  padding: 0 10px;
`;

class Layout extends Component {
  state = {
    collapsed: true,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    const auth = this.props.isAuthenticated ? 
              (<Link to='/logout'><span>Logout</span></Link>):
              (<Link to='/login'><span>Login</span></Link>)
    const orders = this.props.isAuthenticated ? 
              (<Menu.Item key="2"><Link to='/orders'><span>Orders</span></Link></Menu.Item>):
              ("")
    return (
      <Aux>
        <AntLayout>
          <Sider
            trigger={null}
            collapsedWidth="0"
            breakpoint="md"
            width="140"
            collapsible
            onCollapse={(collapsed, type) => { }}
            collapsed={this.state.collapsed}>
            <Logo>
              <Link to='/'><span><img style={{ maxWidth: "100px"}} src={logo} alt="ilford" /></span></Link>
            </Logo>

            <Menu theme="light" mode="inline" >
              <Menu.Item key="1"><Link to='/films'><span>Films</span></Link></Menu.Item>
              { orders }
              <Menu.Item key="3">{ auth }</Menu.Item>
            </Menu>

          </Sider>

        <AntLayout style={{ height:"100vh" }}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Trigger>
                <Icon
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                  style={{cursor: 'pointer'}}
                />
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
          </AntLayout>
        </AntLayout>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null
    };
};

export default connect( mapStateToProps )( Layout );
