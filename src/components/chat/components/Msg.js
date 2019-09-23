import React from 'react';
import './msg.scss';

export default ({message, me}) => (
  <p className={message.nick===me ? 'msg msg-mine' : 'msg'}>
    {message.nick!==me && <b>{message.nick}: </b>}
    {message.message}</p>
)
