import React from "react";
import Post from "../post/post";

import { useSelector } from "react-redux";
import { getOpenPost } from "../data/dataSlice";


export default function OpenPost() {
  
  const data = useSelector(getOpenPost);
  const { isLoading } = useSelector((state) => state.data);

  console.log(data)
  console.log(isLoading)

  if(isLoading || Object.keys(data).length === 0) { // Checks to makes sure that there is data to pull and that it's not loading
    return <h3 className="postHandler">Loading...</h3>
  }

  return (
    <div className="postHandler">
      <div className="postContainer">
        <Post data={data}/>
      </div>
    </div>
  )
}