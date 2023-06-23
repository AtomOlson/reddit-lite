import React from "react";
import Post from "../post/post";
import { useSelector } from "react-redux";
import { getPosts } from "../data/dataSlice";
import { v4 as uuidv4 } from 'uuid';

export default function PostHandler() {
  const posts = useSelector(getPosts);
  const { isLoading } = useSelector((state) => state.data);

  if(isLoading || Object.keys(posts).length === 0) { // Checks to makes sure that there is data to pull and that it's not loading
    return <h3 className="postHandler">Loading...</h3>
  }

  return (
    <div className="postHandler">
      <div className="postContainer">
        {posts.map(post => {
          return <Post data={post.data} 
                      key={uuidv4()}
                      />
        })}
      </div>
    </div>
  )
}