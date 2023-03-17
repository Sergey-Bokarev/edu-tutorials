import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsersFetch } from './actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.mainReducer.users);

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <div>Users: {users.map(user => <div key={user.id}>{user.name}</div>)}</div>
    </div>
  );
}

export default App;
