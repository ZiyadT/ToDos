import React, {Component} from 'react'
import Authentication from './pages/Authentication';
import Todos from './pages/Todos';
import './App.css';

export default class App extends Component {
  state = {
    user: null
  }

  setUserInState = (incomingUserData) => {
    this.setState({user: incomingUserData})
  }
  
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        token = null
      } else {
        this.setState({ user: payload.user })
      }
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.user ?
          <Todos setUserInState={this.setUserInState} user={this.state.user} />
        :
          <Authentication setUserInState={this.setUserInState}/>
        }
      </div>
    )
  }
}