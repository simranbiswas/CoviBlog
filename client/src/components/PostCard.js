import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({
  post: { id, body, createdAt, username, avatar, likeCount, likes, commentCount, comments }
}) {
  const { user } = useContext(AuthContext);
  var src;
  if(avatar==='1'){
      src = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
    }else if(avatar==='2'){
      src = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
    }else if(avatar==='3'){
      src = 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
    }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={src}
          
        />
        <Card.Header>@{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post = {{ id, likes, likeCount}}/>
        <MyPopup content="Comment on post">
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
              <Button color='blue' basic>
                  <Icon name='comments' />
              </Button>
              <Label basic color='blue' pointing='left'>
                  {commentCount}
              </Label>
          </Button>
        </MyPopup>
        
        {user && user.username === username && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;