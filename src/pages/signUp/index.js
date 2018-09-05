import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, ScrollView } from 'react-native';
import api from '../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignInLink,
  SignInLinkText,
} from './styles';

class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  handleNameChange = (username) => {
    this.setState({ username });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'All fields are required!' }, () => false);
    } else {
      try {
        await api.post('/users', {
          username: this.state.username,
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        });

        this.setState({ success: 'Congratulations! Redirecting to login', error: '' });

        setTimeout(this.goToLogin, 2500);
      } catch (err) {
        this.setState({ error: 'Error. Please try again later!' });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />

        <Logo source={require('../../images/logo.png')} resizeMode="contain" />

        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
        
        <Input
          placeholder="Username"
          value={this.state.username}
          onChangeText={this.handleUsernameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <Input
          placeholder="Name"
          value={this.state.name}
          onChangeText={this.handleNameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          placeholder="Email"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <Input
          placeholder="Password"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}

        <Button onPress={this.handleSignUpPress}>
          <ButtonText>SignUp</ButtonText>
        </Button>

        <SignInLink onPress={this.handleBackToLoginPress}>
          <SignInLinkText>Back to SignIn</SignInLinkText>
        </SignInLink>

      </Container>
    );
  }
}

export default SignUp;