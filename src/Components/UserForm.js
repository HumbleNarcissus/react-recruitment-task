import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

import { validateEmail, validateIp, validateUser } from '../utils/validation';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  add_button: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: 'white',
    textTransform: 'none'
  }
});

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'nickname': '',
      'email': '',
      'ip': ''
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault();

    const { nickname, email, ip } = this.state;
    const { users } = this.props;

    const newUser = {
      'nickname': nickname,
      'email': email,
      'ip': ip
    }

    if (validateUser(users, nickname, email) !== true && nickname !== '')
      this.props.addUser(newUser);
  }

  render() {

    const { nickname, email, ip } = this.state;
    const { classes } = this.props;
    const isEmailValid = validateEmail(email);
    const isIpValid = validateIp(ip);
    const isFormValid = isEmailValid && isIpValid ? true : false

    return (
      <form onSubmit={this.onSubmit} autoComplete="off">
        <TextField
          label="Nickname"
          value={nickname}
          onChange={this.onChange}
          margin="normal"
          name='nickname'
        />
        <br />
        <TextField
          label="Email"
          value={email}
          onChange={this.onChange}
          margin="normal"
          name='email'
          error={email !== '' && !isEmailValid}
          helperText={email !== '' && !isEmailValid ? 'Wrong email format': ''}
        />
        <br />
        <TextField
          label="IP address"
          value={ip}
          onChange={this.onChange}
          margin="normal" 
          name='ip'
          error={ip !== '' && !isIpValid}
          helperText={ip !== '' && !isIpValid ? 'Wrong IP address' : ''}
        />
        <br />
        <Fab
          variant='extended'
          type='submit'
          disabled={!isFormValid}
          className={classes.add_button}
          color='secondary'
        >
          Add user
        </Fab>
      </form>
    )
  }
}

export default withStyles(styles)(UserForm);