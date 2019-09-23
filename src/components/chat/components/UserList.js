import React from 'react';

const UserList = ({users, me}) => {
  return (
    <div>
      <p>Кто еще в чате:</p>
      {users.map((user, index) => (user !== me &&
          <strong key={index}>{user}<br/></strong>))}
    </div>
  );
};

export default UserList;
