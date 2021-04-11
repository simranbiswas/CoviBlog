import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY,  } from '../util/graphql';
import MyPopup from '../util/MyPopup';

function DeleteButton({ postId, commentId, chatId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deleteChat] = useMutation(DELETE_CHAT_MUTATION,{
      update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
          query: FETCH_CHATS_QUERY
        });
        data.getChats = data.getChats.filter((p) => p.id !== chatId);
        proxy.writeQuery({ query: FETCH_CHATS_QUERY, data });

        if(callback) callback();
      },
      variables:{
        chatId
      }
  });

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
        <MyPopup
        content={commentId ? 'Delete comment' : "Delete post"}
        >
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={chatId ? deleteChat :deletePostOrMutation}
      />
    </>
  );
}

const FETCH_CHATS_QUERY = gql`{
  getChats{
      id
      body
      createdAt
      username
    }
}
`;
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_CHAT_MUTATION = gql`
  mutation deleteChat($chatId: ID!) {
    deleteChat(chatId: $chatId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;