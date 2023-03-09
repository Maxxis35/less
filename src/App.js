import React, {useEffect, useMemo, useState} from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostsList from "./components/PostsList";
import "./styles/App.css"
import MyModal from "./components/UI/Modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostLoading, setPostLoading] = useState(false);

  useEffect(()=>{
     fetchPosts();
    }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  async function fetchPosts (){
      setPostLoading(true);
      const posts = await PostService.getAll();
      setPosts(posts);
      setPostLoading(false);
  }

  return (
    <div className="App">
        <MyButton onClick={fetchPosts}>Get Posts</MyButton>
      <MyButton style={{marginTop: '30px'}} onClick={()=>setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter}/>
        {isPostLoading
            ? <h1>Loading....</h1>
            : <PostsList remove={removePost} posts={sortedAndSearchedPosts} title="Posts List JS"/>
        }
    </div>
  );
}

export default App;
