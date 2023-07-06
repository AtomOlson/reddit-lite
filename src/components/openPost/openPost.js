import React, { useEffect } from "react";
import Post from "../post/post";
import Comments from "../comments/comments";

import { useSelector } from "react-redux";
import { getComments, getOpenPost } from "../data/dataSlice";


export default function OpenPost() {
  const data = useSelector(getOpenPost);
  const { isLoading } = useSelector((state) => state.data);
  const comments = useSelector(getComments) // Passes all the comments as props, so that lower comments can sort their own replies
  // const userIcons = useSelector(getUserIcons);
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   for(const user in userIcons) {
  //     if(user === 'no icon') {
  //       dispatch(setUserIcons({[user]: 'setting icon'}))
        
  //     }
  //   }
    
  // }, [userIcons, dispatch])

  
  
  if(isLoading || Object.keys(data).length === 0) { // Checks to makes sure that there is data to pull and that it's not loading
    return <h3 className="postHandler">Loading...</h3>
  }

  return (
    <div className="postHandler">
      <div className="openPostContainer">
        <Post data={data}
              open={true}
            />
        <section className="commentSection" >
          <Comments comments={comments} />
        </section>
      </div>
    </div>
  )
}