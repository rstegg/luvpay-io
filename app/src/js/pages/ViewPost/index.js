import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Redirect, NavLink } from 'react-router-dom'
import { Card, Image, Button, Grid } from 'semantic-ui-react'

import PostMenu from '../../components/PostMenu'

import { fetchSinglePost, deletePost } from '../../redux/actions/posts'

const renderType = (post_type, topic) =>
  post_type === 'topic' ? `Topic in ${topic}` : 'Open post'

class ViewPost extends Component {
  componentWillMount() {
    const { match: { params }, fetchSinglePost, user } = this.props
    fetchSinglePost(params.id, user)
  }
  render() {
    const { post, user, deletePost } = this.props
    if(!post) {
      return <Redirect to='/' />
    }
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Card>
              <Image src={post.image || '/images/postholder.png'} className='post--image' />
              <Card.Content>
                <Card.Header>{post.name}</Card.Header>
                {post.user &&
                  <NavLink to={`/user/${post.user.username}`} from={`/post/${post.slug}`}>
                    started by <Image avatar src={post.user.image || '/images/placeholder.png'} /> {post.user.username}
                  </NavLink>
                }
                <Card.Meta>{renderType(post.post_type, post.topic)} {post.topic === 'other' && ` - ${post.topic_other}`}</Card.Meta>
                <Card.Description>{post.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                { post.userId === user.id ?
                  <div className='ui two buttons'>
                    <Button as={NavLink} to={`/posts/edit/${post.slug}`} from={`/post/${post.slug}`} basic color='green'>Edit</Button>
                    <Button basic color='red' onClick={() => deletePost(post.id, user)}>Delete</Button>
                  </div>
                  :
                  <Button as={NavLink} to={`/pages/new/${post.slug}`} from={`/post/${post.slug}`} basic color='green'>Comments</Button>
                }
              </Card.Content>
            </Card>
          </Grid.Row>
          <Grid.Row>
            <PostMenu url={`https://kuwau.com/post/${post.slug}`} postId={post.id} />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({posts, user}) =>
({
  post: posts.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  fetchSinglePost: (id, user) => dispatch(fetchSinglePost(id, user)),
  deletePost: (id, user) => dispatch(deletePost(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPost)
