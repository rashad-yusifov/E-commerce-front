import React from 'react';
import {
    Container,
    Menu,
  } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to="/" >Movies</Menu.Item>
        <Menu.Item as={NavLink } to="/control-movie" >Add Movie</Menu.Item>
      </Container>
    </Menu>
  )
}