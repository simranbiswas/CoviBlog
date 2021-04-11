import React, { useContext, useState } from 'react'
import { Menu, Segment, Icon, Sidebar, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

import { AuthContext } from '../context/auth';


function MenuBar() {
  const { user, logout } = useContext(AuthContext);


  const pathname = window.location.pathname;
  console.log(pathname.substr(1));
  const path = pathname ==='/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  
  const menuBar= user ? (
    
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name= 'home' active={activeItem === 'home'} onClick={handleItemClick} as={Link} 
        to="/"><Icon name='home' />@{user.username}</Menu.Item>
        
        <Menu.Item name= 'viewProfile' active={activeItem === 'viewProfile'} onClick={handleItemClick} as={Link}
         to={`/viewProfile/${user.username}`} ><Icon name='user outline' />My Profile</Menu.Item>

        <Menu.Item name="chat" active={activeItem === 'chat'} onClick={handleItemClick}  as={Link}
        to={`/chat/${user.username}`}><Icon name='wechat' />Chat with People</Menu.Item>
        
        <Menu.Menu position="right">
          <Menu.Item name= 'cov' active={activeItem === 'cov'} onClick={handleItemClick} as={Link}
           to="/covidlive" ><Icon name='chart line' />Covid Live</Menu.Item>
          <Menu.Item name="logout" onClick={logout} ><Icon name='log out' />Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
      
    ) : (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        ><Image src='favicon-32x32.png' avatar /><span className="logo">CoviBlog</span></Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          ><Icon name='sign in' />Log In</Menu.Item>
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          ><Icon name='signup' />Register</Menu.Item>
        </Menu.Menu>
      </Menu>
    );

    return menuBar;
}

export default MenuBar;