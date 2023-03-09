import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostsList from "./components/PostsList";
import "./styles/App.css"
import MyModal from "./components/UI/Modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
    {id:1, title: 'JavaScript 1', body: 'Descriprion'},
    {id:2, title: 'JavaScript 2', body: 'Descriprion'},
    {id:3, title: 'JavaScript 3', body: 'Descriprion'},
    {id:4, title: 'JavaScript 4', body: 'Descriprion'}
  ])

  const [filter, setFilter] = useState({sort:'', query:''})
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(()=> {
    if (filter.sort) {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])

 
  const sortedAndsearchedPosts = useMemo(()=> {
    return sortedPosts.filter(post=> post.title.toLocaleLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={()=>setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostsList remove={removePost} posts={sortedAndsearchedPosts} title="Posts List JS"/>

      
    </div>
  );
}

export default App;
