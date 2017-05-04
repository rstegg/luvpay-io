import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect, NavLink } from 'react-router-dom'
import { Image, Button, Grid, Header, Label } from 'semantic-ui-react'

import PageMenu from '../../components/PostMenu'

import { fetchSinglePage, deletePage, joinPage } from '../../redux/actions/pages'

class ViewPage extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchSinglePage(params.id, user)
  }
  render() {
    const { page, user, joinPage, deletePage } = this.props
    if(!page) {
      return <Redirect to='/' />
    }
    return (
      <Grid celled className='main-container'>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={page.image || '/images/postholder.png'} className='page--image' />
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as='h1'>{page.name}</Header>
            <Header as='h4'>{page.description}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            { page.userId === user.id ?
              <div className='ui two buttons'>
                <Button as={NavLink} to={`/pages/edit/${page.slug}`} from={`/page/${page.slug}`} basic color='green'>Edit</Button>
                <Button basic color='red' onClick={() => deletePage(page.id, user)}>Delete</Button>
              </div>
              :
              <Button onClick={() => joinPage(page.id, user)} basic color='green'>Join Page</Button>
            }
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
    )
  }
}

const mapStateToProps = ({pages, user}) =>
({
  page: pages.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchSinglePage: (pageId, user) => dispatch(fetchSinglePage(pageId, user)),
  deletePage: (pageId, user) => dispatch(deletePage(pageId, user)),
  joinPage: (pageId, user) => dispatch(joinPage(pageId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPage)
