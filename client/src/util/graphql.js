import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            body
            createdAt
            username
            avatar
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`;

export const FETCH_CHATS_QUERY = gql`{
  getChats{
      id
      body
      createdAt
      username
    }
}
`;