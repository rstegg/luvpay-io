export const fetchFeed = () =>
({
  type: 'FETCH_FEED'
})

export const onFetchFeedSuccess = res =>
({
  type: 'FETCH_FEED_SUCCESS',
  payload: {
    feed: res.body.feed
  }
})

export const fetchFeedPost = post =>
({
  type: 'FETCH_FEED_POST',
  payload: {
    post
  }
})

export const onFetchFeedPostSuccess = res =>
({
  type: 'FETCH_FEED_POST_SUCCESS',
  payload: {
    feed: res.body.feed
  }
})
