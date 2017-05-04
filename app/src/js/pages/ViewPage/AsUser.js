import React from 'react'
import { NavLink } from 'react-router-dom'
import { Image, Button, Grid, Header, Label } from 'semantic-ui-react'

import PageMenu from '../../components/PostMenu'

const UserView = ({
  page,
  user,
  joinPage
}) =>
  <Grid celled className='main-container'>
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src={page.image || '/images/postholder.png'} className='page--image' />
      </Grid.Column>
      <Grid.Column width={10}>
        <Header as='h4'>{page.description}</Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <Header as='h1'>{page.name}</Header>
        <Button onClick={() => joinPage(page.id, user)} basic color='green'>Join Page</Button>
      </Grid.Column>
      <Grid.Column width={10}>
        {page.user &&
          <Label to={`/user/${page.user.username}`} from={`/page/${page.slug}`} as={NavLink} basic image>
            <img src={page.user.image || '/images/placeholder.png'} alt={user.username} /> {page.user.username}
          </Label>
        }
      </Grid.Column>
      <Grid.Column width={3}>
        <PageMenu url={`https://kuwau.com/page/${page.slug}`} pageId={page.id} />
      </Grid.Column>
    </Grid.Row>
  </Grid>

export default UserView
