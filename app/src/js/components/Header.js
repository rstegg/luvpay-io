import React from 'react'
import { connect } from 'react-redux'

import { Button, Menu, Label } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'
import Flydown from './Flydown'

const Header = ({user, isMobile}) =>
  user.isAuthenticated ?
    <Menu fluid fixed='top'>
      <Menu.Item header>Kuwau</Menu.Item>
      <Menu.Item position='right'>
        { isMobile ?
          <Button.Group toggle>
            <Flydown />
          </Button.Group>
          :
          <Button.Group>
            <NavLink to={`/user/${user.username}`} from="/">
              <Label basic image>
                <img src={user.image || '/images/placeholder.png'} alt={user.username} /> {user.username}
              </Label>
            </NavLink>
          </Button.Group>
        }
      </Menu.Item>
    </Menu>
    :
    <Menu fluid fixed='top' borderless>
      <Menu.Item header>Kuwau</Menu.Item>
      <Menu.Item position='right'>
        {
          isMobile ?
          <Button.Group>
            <Flydown />
          </Button.Group>
          :
          <Button.Group>
            <NavLink to="/login" from="/">
              <Button primary>Login</Button>
            </NavLink>
            <Button.Or />
            <NavLink to="/signup" from="/">
              <Button positive>Sign up</Button>
            </NavLink>
        </Button.Group>
        }
      </Menu.Item>
    </Menu>

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps)(Header)
