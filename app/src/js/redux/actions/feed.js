export const fetchPublicFeed = () =>
({
  type: 'FETCH_PUBLIC_FEED'
})

export const onFetchPublicFeedSuccess = res =>
({
  type: 'FETCH_PUBLIC_FEED_SUCCESS',
  payload: {
    feed: res.body.feed
  }
})

export const fetchFeed = user =>
({
  type: 'FETCH_FEED',
  payload: {
    user
  }
})

export const onFetchFeedSuccess = res =>
({
  type: 'FETCH_FEED_SUCCESS',
  payload: {
    feed: res.body.feed
  }
})
