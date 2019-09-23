import React, {Component} from 'react';
import MsgCompose from './components/MsgCompose';
import MsgList from './components/MsgList';
import UserList from './components/UserList';
import './chat.scss';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
      nick: props.nick,
    };

    this.addMessage = this.addMessage.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.handleWindowClose = this.handleWindowClose.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    window.addEventListener('storage',
        event => this.handleStorageChange(
            {key: event.key, value: event.newValue}));

    window.addEventListener('beforeunload', this.handleWindowClose);
  }

  componentDidMount() {
    // При запуске загрузить чат из localStorage
    let storageData = JSON.parse(localStorage.getItem('chat'));
    const savedMessages = storageData ? storageData : [];
    storageData = JSON.parse(localStorage.getItem('users'));
    const savedUsers = storageData ? storageData : [];

    this.setState(prevState => ({
      ...prevState,
      messages: savedMessages, users: savedUsers,
    }));
  }

  toggleSidebar() {
    if (this.sideBar.classList.contains('visible')) this.sideBar.classList.remove('visible');
    else this.sideBar.classList.add('visible');
  }

  handleStorageChange({key, value}) {
    this.setState(state => {
      const messages = key === 'chat' ? JSON.parse(value) : [...state.messages];
      const users = key === 'users' ? JSON.parse(value) : [...state.users];
      return {...state, messages: messages, users: users};
    });
  }


  handleWindowClose(event) {
    event.preventDefault();
    const users = this.state.users.filter(user=>(user!==this.state.nick));
    localStorage.setItem('users', JSON.stringify(users));
  }

  addMessage(text) {
    this.setState(state => {
      let messages = [...state.messages];
      messages.push({
        nick: state.nick,
        message: text,
      });
      localStorage.setItem('chat', JSON.stringify(messages));
      return {...state, messages: messages};
    });
  }

  render() {
    const {nick, users, messages} = this.state;
    return (
        <div className="container-fluid chat">
          <button className="btn btn-sm btn-dark btn-side d-md-none" onClick={this.toggleSidebar}>?</button>
          <div className="row">
            <div className="col-md-4 col-lg-3 chat__side" ref={el=>this.sideBar=el}>
              <p className="mt-3 font-weight-bold">Привет, {nick}!</p>
              <hr/>
              <UserList users={users} me={nick}/>
            </div>

            <div className="col">
              <MsgList messages={messages} me={nick}/>
            </div>
          </div>

          <MsgCompose messageHandler={this.addMessage}/>
        </div>
    );
  }
}

export default Chat;
