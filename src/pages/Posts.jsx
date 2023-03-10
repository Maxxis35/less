import React, {useEffect, useMemo, useState} from "react";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostsList from "../components/PostsList";
import MyModal from "../components/UI/Modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort:'', query:''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async ()=>{
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });


    useEffect(()=>{
        fetchPosts();
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }


    return (
        <div className="App">
            <MyButton onClick={fetchPosts}>Get Posts</MyButton>
            <MyButton style={{marginTop: '30px'}} onClick={()=>setModal(true)}>Create post</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Error</h1>}
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop:'50px'}} >
                    <Loader/>
                </div>
                : <PostsList remove={removePost} posts={sortedAndSearchedPosts} title="Posts List JS"/>
            }
        </div>
    );
}

export default Posts;