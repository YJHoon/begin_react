import React, {useRef, useState, useMemo, useCallback, useReducer, createContext} from 'react';
import Hello from './Hello';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

function countActiveUsers(users){
  console.log('활성화 수')
  return users.filter(user => user.active).length
}

const initialState = {
  users: [
    {
      id: 1,
      username: "test1",
      email: "111@naver.com",
      active: true
    },
    {
      id: 2,
      username: "test2",
      email: "222@naver.com",
      active: false
    },
    {
      id: 3,
      username: "test3",
      email: "333@naver.com",
      active: false
    }
  ]
}

function reducer(state, action) {
  switch(action.type){
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      }
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.id
            ? {...user, active: !user.active}
            : user
          ) 
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    default:
      // return state;
      throw new Error('Unhandled action');
  }

}

export const UserDispatch = createContext(null);


function App() {
  const [state, dispatch] = useReducer (reducer, initialState);
  const [form, onChange, reset] =  useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;
  const nextId = useRef(4);
  const {users} = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
         username,
        email
      }
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset])

 
  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} />
      <div>활성 사용자 수: {count} </div>
      {/* <Hello name="react" title="asdasd"/> */}
    </UserDispatch.Provider>
  );
}

export default App;
