import React, { useEffect, useState } from 'react';
import './App.css';
import Getdata from './components/getApi.js';
import Post from './components/post.jsx';
import ModalWindow from './components/modalWindow.jsx';

function App() {

  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [countPosts, setCountPosts] = useState(5)

  useEffect(() => {
    Getdata('posts').then(setPosts);
    Getdata('users').then(setUsers);
  },[])

  const showMorePosts = () =>{
      setCountPosts(countPosts + 5)
  }
  
  return (
    <div className="main">
      <div className="block__posts">{posts.slice(0,countPosts).map((el => <Post users={users} title={el.title} body={el.body} id={el.userId}/>))}</div>
      <button className="posts__button" onClick={showMorePosts}>Show More</button>

      {users.map((el) => <ModalWindow  name={el.name} address={el.address} email={el.email} telephone={el.phone}/>)}
      {/* {console.log(users)} */}
    </div>
  );
}

export default App;
