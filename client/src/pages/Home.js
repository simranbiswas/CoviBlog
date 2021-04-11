import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, GridColumn, Transition, Image, GridRow,Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import img from './media/img.png';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading, data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={2}>
        <Grid.Row centered>
            <GridColumn width={2}>
                <Image src={img} size="tiny" circular />
            </GridColumn>
            <GridColumn width={4}>
                <GridRow>
                    <h1><span className="logo">CoviBlog</span></h1>
                </GridRow>
                <GridRow>
                    <h3><span className="opac">Blogsite for Covid Updates</span></h3>
                </GridRow>
            </GridColumn>
        </Grid.Row><br/>
        <Grid.Row className="page-title">
            <h2><Icon name='feed' /> Recent Posts</h2>
        </Grid.Row>
        <Grid.Row>
            {user && (
                <Grid.Column>
                     <PostForm />
                </Grid.Column>
            )}
            {loading ? (
            <h1>Loading posts..</h1>
            ) : (
                <Transition.Group>
                {posts && posts.map((post) => (
                    <GridColumn key ={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post = {post} />
                    </GridColumn>
                ))}
                </Transition.Group>
            )}
        </Grid.Row>
    </Grid>
  );
}


export default Home;