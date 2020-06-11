import React, { useContext } from 'react'
import {UserDispatch} from './App';

const User = React.memo(function User({ user }) {
  const { username, email, id, active } = user;
  const dispatch = useContext(UserDispatch);

  useEffect(() => {
    console.log(user)
    return() => {
      console.log('화면에서 사라짐')
    }
  }, [user]);
  return (
    <div>
      <b style={{
          color: active ? 'green' : 'black',
          cursor: 'pointer'
      }}
      onClick={() => dispatch}>{ username }</b> <span> { email }</span>
      <button onClick={() => }>삭제</button>
    </div>
  );
});

function UserList( {users} ){
  
  return(
    <div>
      {
        users.map(
          user => (<User user={user} key={user.id}/>)
        )
      }
    </div>
  )
}

export default React.memo(UserList, (prevProps, nextProps) => nextProps.users === prevProps.users);