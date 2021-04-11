import React, {useContext, useState} from 'react'
import { Button, Form, Grid, Image } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from '../util/hooks'; 
import { AuthContext } from '../context/auth';
import reg from './media/reg.png';
import set from './media/set.png';

export default function Register(props) {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const options = [
        { key: '1', text: '1', value: '1' },
        { key: '2', text: '2', value: '2' },
        { key: '3', text: '3', value: '3' },
    ]
    const { onChange, onSubmit, values } = useForm(registerUser,{
        username: '',
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        bio: '',
        avatar: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, {data: {register: userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }

    return (
        <div>
        <h2 className="page-intro">Register today at <span className="logo">CoviBlog</span> and stay informed with all the latest Covid updates.</h2><br></br>
        <Grid>
        <Grid.Row >
            <Grid.Column width={3}>
                <br></br><br></br><br></br><br></br>
                <Image src={set} size='medium' />
            </Grid.Column>
            <Grid.Column width={10}>
                <div className="form-container">
                    <Form onSubmit={onSubmit} noValidate className={loading? "loading": ''}>
                        
                        <Form.Input
                            label="username"
                            placeholder="username.."
                            name="username"
                            type="text"
                            value={values.username}
                            error={errors.username ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="name"
                            placeholder="name..."
                            name="name"
                            type="text"
                            value={values.name}
                            error={errors.name ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="email"
                            placeholder="email.."
                            name="email"
                            type="email"
                            value={values.email}
                            error={errors.email ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="bio"
                            placeholder="Enter bio describing yourself in one line..."
                            name="bio"
                            type="text"
                            value={values.bio}
                            error={errors.bio ? true : false}
                            onChange={onChange}
                        />
                        <Grid relaxed columns={3}>
                            <Grid.Column>
                                <p>1</p>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                            </Grid.Column>
                            <Grid.Column>
                                <p>2</p>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                            </Grid.Column>
                            <Grid.Column>
                                <p>3</p>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                            </Grid.Column>
                        </Grid>
                        <Form.Input
                            label="Select your avatar"
                            placeholder="Enter avatar number in single digit.. eg. 1"
                            name="avatar"
                            type="avatar"
                            error={errors.password ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="Password"
                            placeholder="Password.."
                            name="password"
                            type="password"
                            error={errors.password ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            label="Confirm Password"
                            placeholder="Confirm Password.."
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={onChange}
                        />
                        <Button type="submit" primary>
                            Register
                        </Button>
                    </Form>
                    {Object.keys(errors).length>0 && (
                        <div className="ui error message">
                            <div className="list">
                                {Object.values(errors).map(value => (
                                    <li key={value}>{value}</li>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Grid.Column>

            <Grid.Column width={3}>
                <br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br>
                <Image src={reg} size='medium' />
            </Grid.Column>
        
    </Grid.Row>
    </Grid>
    </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $name: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $bio: String!
        $avatar: String!
    ) {
        register(
            registerInput: {
                username: $username
                name: $name
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                bio: $bio
                avatar: $avatar
            }
        ) {
            id name email username createdAt token
        }
    }
`