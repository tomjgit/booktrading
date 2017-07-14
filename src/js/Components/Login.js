import React from "react";
import { Button, Checkbox, Form, Grid, Segment, Icon, Header, Message } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogin } from "../actions";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:""
        }

        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    login(e) {
        e.preventDefault();
        
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.userLogin(user);
  }

    render(){
        if(this.props.user._id){
            return (
                <Redirect to="/" />
            );
        }

        return(
            <div>
                <Grid centered verticalAlign="middle" relaxed>
                    <Grid.Column mobile={16} computer={8} tablet={10}>
                        <Header as="h2" color="teal">Log-in to your account</Header>
                        <Segment stacked>
                            <Form onSubmit={ this.login } loading={(this.props.loading)?true:false} error={this.props.error?true:false}>
                                <Message
                                    error
                                    header="Failed login attempt"
                                    content={this.props.error}
                                />
                                <Form.Input name="username" icon="user" iconPosition="left" type="text" placeholder="Username" onChange={this.handleInputChange} />
                                <Form.Input name="password" icon="lock" iconPosition="left" type="password" placeholder="Password" onChange={this.handleInputChange} />
                                <Form.Button color="teal" fluid>Submit</Form.Button>
                            </Form>
                        </Segment>
                        <Message>
                            Don't have an account?
                            <Link to="/signup"> Sign up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        loading: state.userLoginLoading,
        error: state.userLoginError
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({userLogin: userLogin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);