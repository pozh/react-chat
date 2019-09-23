import React, {Component} from 'react';
import Signin from './components/signin/Signin';
import Chat from './components/chat/Chat';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nick: null,
    };
    this.handleSignin = this.handleSignin.bind(this);
  }

  componentDidMount() {
    let nick = sessionStorage.getItem('nick');
    this.setState({nick});
  }

  handleSignin(nickname) {
    this.setState({nick: nickname});
    sessionStorage.setItem('nick', nickname);
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(nickname);
    localStorage.setItem('users', JSON.stringify(users));
  }

  render() {
    return (
        <div className="app">
          {!this.state.nick && <Signin handleProceed={this.handleSignin}/>}
          {this.state.nick && <Chat nick={this.state.nick}/>}
        </div>
    );
  }
}

export default App;
