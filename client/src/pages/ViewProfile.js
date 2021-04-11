import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Item } from 'semantic-ui-react';
import {Button, Card, Form,  Grid, GridColumn, Transition, Image} from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import moment from 'moment';
import img1 from './media/img1.png';
import img2 from './media/img2.png';

import { AuthContext } from '../context/auth';

function ViewProfile(props) {
    const username = props.match.params.username;
    const { user } = useContext(AuthContext);

    const {
        data: { viewProfile } = {}
    } = useQuery(FETCH_ACCOUNT_QUERY, {
        variables: {
        username
        }
    });

  let viewProf;
  if (!viewProfile) {
    viewProf = <p>Loading profile..</p>;
  } else {
    const {
      id,
      username,
      avatar,
      bio,
      name,
      joinedAt,
      posts
    } = viewProfile;

    var src;

    if(avatar==='1'){
      src = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
    }else if(avatar==='2'){
      src = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
    }else if(avatar==='3'){
      src = 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
    }

    console.log(viewProfile);

    viewProf = (
      <Grid >
        <Grid.Row centered>
          <Grid.Column width={3}>
            <Image src={src} circular/>
          </Grid.Column>
          <Grid.Column width={3}>
            <Item.Group>
            <Item>
              <Item.Content>
                <h2>{name}</h2>
                <Item.Header as='a'><span className="usern">@{username}</span></Item.Header>
                <Item.Meta>
                  <span >Joined {moment(joinedAt).fromNow()}</span>
                </Item.Meta><br/>
                <Item.Meta>
                  <span >About</span>
                </Item.Meta>
              
                <Item.Description>
                  <h3>
                    {bio}
                  </h3>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          </Grid.Column>
        </Grid.Row><br/><hr/>
        <Grid.Row centered>
          <Grid.Column width={3}>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <Image src={img2} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Grid.Row className="page-title">
                <h2>@{username}'s Posts</h2>
            </Grid.Row><br/>
            <Grid.Row>
              <Transition.Group>
              {posts && posts.map((post) => (
                  <Grid.Column key ={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post = {post} />
                  </Grid.Column>
              ))}
              </Transition.Group>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={3}>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <Image src={img1} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
     
  }
  return viewProf;

};

const FETCH_ACCOUNT_QUERY = gql`
  query($username: String!) {
    viewProfile(username: $username) {
      id
      username
      bio
      avatar
      name
      joinedAt
      posts{
        id
        body
        createdAt
        username
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          createdAt
          body
        }
      }
    }
  }
`;

export default ViewProfile;