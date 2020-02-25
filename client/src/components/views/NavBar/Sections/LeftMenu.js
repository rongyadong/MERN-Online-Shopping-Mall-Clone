import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to={'/'}>Home</Link>
        </Menu.Item>
      </Menu>
  );
}

export default LeftMenu;