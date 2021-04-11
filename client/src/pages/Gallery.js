import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';
import { Link } from 'react-router-dom';
import { useForm } from '../util/hooks';

function Gallery(props) {
  const username = props.match.params.username;
  const { user } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const chatInputRef = useRef(null);

  const [chat, setChat] = useState('');
  const path = pathname === '/' ? 'home' : pathname.substr(1);


  const {
    data: { getChats : chats} = {}
  } = useQuery(FETCH_CHATS_QUERY);

  const [submitChat] = useMutation(CREATE_CHAT_MUTATION, {
    update() {
      setChat('');
      chatInputRef.current.blur();
    },
    variables: {
      username,
      body: chat
    }
  });

  return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Chat.."
                        name="chat"
                        value={chat}
                        onChange={(event) => setChat(event.target.value)}
                        ref={chatInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={chat.trim() === ''}
                        onClick={submitChat}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {chats && chats.map((chat) => (
              <Card fluid key={chat.id}>
                <Card.Content>
                  {user && user.username === chat.username && (
                    <DeleteButton chatId={chat.id} />
                  )}
                  <Card.Header>@{chat.username}</Card.Header>
                  <Card.Meta>{moment(chat.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{chat.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
      
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  

const CREATE_CHAT_MUTATION = gql`
  mutation($username: String!, $body: String!) {
    createChat(username: $username, body: $body) {
      id
      body
      createdAt
      username
    }
  }
`;

const FETCH_CHATS_QUERY = gql`{
  getChats{
      id
      body
      createdAt
      username
    }
}
`;

export default Gallery;