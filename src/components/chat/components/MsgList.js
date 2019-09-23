import React from 'react';
import Msg from './Msg';
import './msglist.scss';

const MsgList = ({messages, me}) => (
  <div className="list">
    {messages.map((message, index) =>
        <Msg id={`msg-${index}`} key={index} message={message} me={me} />
    )}
  </div>
);

export default MsgList;
