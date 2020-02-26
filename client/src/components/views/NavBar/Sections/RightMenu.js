import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import Axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user);
  const {userData} = user;

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
          <Menu.Item key="history">
              <Link to='/history'>History</Link>
          </Menu.Item>
          <Menu.Item key="upload">
              <Link to='/product/upload'>Upload</Link>
          </Menu.Item>
          <Menu.Item key="cart">
              <Badge count={userData && userData.cart.length}>
                  <Link to='/user/cart' style={{marginRight: '-22px', color: '#667777'}}>
                      <Icon type='shopping-cart' style={{fontSize: '30px', marginBottom: '4px'}}/>
                  </Link>
              </Badge>
          </Menu.Item>
        <Menu.Item key="logout">
          <a href="/login" onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

