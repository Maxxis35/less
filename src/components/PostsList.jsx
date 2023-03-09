import React, { Component } from 'react'
import PostItem from './PostItem';
import {TransitionGroup} from "react-transition-group";
import {CSSTransition} from "react-transition-group";

const PostsList = ({posts, title, remove}) => {
    
    if(!posts.length) {
        return(
            <h1 style={{textAlign: 'center'}}>Post list loss</h1>
        )
    }

    return (
        <div>
            <h1>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                    <PostItem remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
};

export default PostsList;
