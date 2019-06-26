import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

import UsersTable from './Components/UsersTable';
import UserForm from './Components/UserForm';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(5)
  },
  headline: {
    margin: 0
  },

});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    this.setState({ users: [...this.state.users, { nickname: 'cat', email: 'cat@gmail.com', ip: '127.255.255.255' }] })
  }

  addUser = (newUser) => {
    this.setState({ users: [...this.state.users, newUser] })
  }

  deleteUser = (nickname) => {
    this.setState({
      users: this.state.users.filter(user => {
        return user.nickname !== nickname
      })
    })
  }

  deleteAll = () => this.setState({ users: [] })

  sortTable = (key) => {
    switch (key) {
      case 'nickname':
        this.setState({ users: this.state.users.sort((a, b) => a.nickname.localeCompare(b.nickname)) })
        break;
      case 'email':
        this.setState({ users: this.state.users.sort((a, b) => a.email.localeCompare(b.email)) })
        break;
      case 'ip':
        this.setState({users: this.state.users.sort((a,b) => {
          const num1 = Number(a.ip.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
          const num2 = Number(b.ip.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
          return num1-num2;
        })})
        break;
      default:
        return;
    }
  }

  render() {

    const { users } = this.state;
    const { classes } = this.props;

    return (
      <Grid container justify='flex-start' className={classes.container}>
        <h1 className={classes.headline}>Crypto users</h1>
        <UserForm addUser={this.addUser} users={users} />
        <Grid container justify='flex-start'>
          {users.length > 0
            ? <UsersTable
              data={this.state.users}
              deleteUser={this.deleteUser}
              deleteAll={this.deleteAll}
              sortTable={this.sortTable}
            />
            : null}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App);